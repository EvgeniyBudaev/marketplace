package com.marketplace.backend.service;

import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.dto.attributes.request.RequestPatchAttributeDto;
import com.marketplace.backend.dto.attributes.request.RequestPutAttributeDto;
import com.marketplace.backend.dto.attributes.request.RequestSaveAttributeDto;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.AttributeMapper;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.service.utils.queryes.QueryParam;
import com.marketplace.backend.service.utils.queryes.processor.QueryProcessor;
import com.marketplace.backend.service.utils.queryes.processor.QueryProcessorImpl;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class AttributeService implements AttributeDao {
    @PersistenceContext
    private final EntityManager entityManager;
    private final AttributeMapper attributeMapper;
    private final SelectableValueMapper selectableValueMapper;
    private final AttributeValueService attributeValueService;


    @Autowired
    public AttributeService(EntityManager entityManager, SelectableValueMapper selectableValueMapper, AttributeValueService attributeValueService) {

        this.entityManager = entityManager;
        this.selectableValueMapper = selectableValueMapper;
        this.attributeValueService = attributeValueService;
        this.attributeMapper = Mappers.getMapper(AttributeMapper.class);
    }

    @Override
    @Transactional(rollbackFor = {ResourceNotFoundException.class})
    public Attribute saveAttribute(RequestSaveAttributeDto dto) {
        Attribute attribute = attributeMapper.dtoToEntity(dto);
        attribute.setCreatedAt(LocalDateTime.now());
        attribute.setModifyDate(LocalDateTime.now());
        entityManager.persist(attribute);
        if (attribute.getFilter() == null) {
            attribute.setFilter(true);
        }
        if (attribute.getEnabled() == null) {
            attribute.setEnabled(true);
        }
        if (dto.getType().equals(EAttributeType.SELECTABLE)) {
            if (dto.getSelectable() != null) {
                List<SelectableValue> newValuesSet = selectableValueMapper.dtoListToEntitySet(dto.getSelectable());
                saveSelectableValues(attribute, newValuesSet);
                attribute.setSingleSelectableValue(new HashSet<>(newValuesSet));
            } else {
                throw new OperationNotAllowedException("В атрибуте с данным типом должно присутствовать хотя бы одно значение");
            }
        }
        return attribute;
    }

    private void saveSelectableValues(Attribute newAttribute, List<SelectableValue> newValueList) {
        newValueList.forEach(x -> {
            x.setAttribute(newAttribute);
            if (x.getId() == null) {
                entityManager.persist(x);
            } else {
                entityManager.merge(x);
            }
            newAttribute.addSelValue(x);
        });
    }

    public Set<Attribute> findAttributesWithValuesByCatalog(Catalog catalog){
       TypedQuery<Attribute> catalogQuery = entityManager
               .createQuery("SELECT a FROM Attribute as a JOIN a.catalog as c  where c=:catalog", Attribute.class);
       catalogQuery.setParameter("catalog",catalog);
       List<Attribute> attributeList = catalogQuery.getResultList();
       if(attributeList.isEmpty()){
           return Collections.EMPTY_SET;
       }
       TypedQuery<Attribute> attributeQuery = entityManager
               .createQuery("SELECT a FROM Attribute as a JOIN FETCH SelectableValue JOIN FETCH DoubleValue where a in (:attributes)", Attribute.class);
       attributeQuery.setParameter("attributes",attributeList);
       return attributeQuery.getResultStream().collect(Collectors.toSet());
    }
    @Transactional
    public Attribute putAttribute(RequestPutAttributeDto dto) {
        Attribute newAttribute = attributeMapper.dtoToEntity(dto);
        if (newAttribute.getEnabled() == null) {
            newAttribute.setEnabled(true);
        }
        newAttribute.setModifyDate(LocalDateTime.now());
        Attribute oldAttribute = getAttributeByIdWitSelectableValues(dto.getId());
        /*произошла смена типа атрибута */
        if (!oldAttribute.getType().equals(newAttribute.getType())) {
            clearValueWhereChangeAttributeType(oldAttribute);
            /*произошла смена типа атрибута и новый тип selectable*/
            if (newAttribute.getType().equals(EAttributeType.SELECTABLE)) {
                List<SelectableValue> newValuesList = selectableValueMapper.dtoListToEntitySet(dto.getSelectable());
                saveSelectableValues(newAttribute, newValuesList);
            }
        }
        entityManager.detach(oldAttribute);
        entityManager.merge(newAttribute);
        /*смены типа не было и у старого и у нового тип selectable*/
        if (oldAttribute.getType().equals(EAttributeType.SELECTABLE) && newAttribute.getType().equals(EAttributeType.SELECTABLE)) {
            Set<SelectableValue> oldValueSet = oldAttribute.getSingleSelectableValue();
            List<SelectableValue> newValueList = selectableValueMapper.dtoListToEntitySet(dto.getSelectable());
            List<SelectableValue> selectableValuesForDelete = oldValueSet.stream().filter(x -> !newValueList.contains(x)).toList();
            attributeValueService.deleteSelectableValues(selectableValuesForDelete);
            saveSelectableValues(newAttribute, newValueList);
        }
        return newAttribute;
    }


    @Transactional
    public Integer delete(String alias) {
        Attribute attribute = getAttributeByIdWitSelectableValues(alias);
        attributeValueService.deleteValuesByAttribute(attribute, attribute.getType().getTableName());
        Query queryAttribute = entityManager.createQuery("DELETE FROM Attribute as a where a.alias=:alias");
        queryAttribute.setParameter("alias", alias);
        return queryAttribute.executeUpdate();
    }

    @Override
    @Transactional
    public Paging<ResponseAttributeForGetAll> findAll(QueryParam param) {
        QueryProcessor processor = new QueryProcessorImpl(param, Attribute.class);
        TypedQuery<Long> countQuery = entityManager.createQuery(processor.getCountQuery(), Long.class);
        TypedQuery<Attribute> resultQuery = entityManager.createQuery(processor.getMainQuery(), Attribute.class);
        if (param.getSearchString() != null) {
            resultQuery.setParameter("param", param.getSearchString());
            countQuery.setParameter("param", param.getSearchString());
        }
        int count = Math.toIntExact(countQuery.getSingleResult());
        Paging<ResponseAttributeForGetAll> result = new Paging<>(count, param.getPageSize(), param.getPage());
        if (count == 0) {
            return result;
        }
        resultQuery.setFirstResult((result.getCurrentPage() - 1) * result.getPageSize());
        resultQuery.setMaxResults(result.getPageSize());
        List<Attribute> attributes = resultQuery.getResultList();
        result.setContent(attributeMapper.entitiesToListDto(attributes));
        return result;
    }

    /*Выдаем аттрибут только если enabled=true*/
    @Override
    @Transactional
    public Attribute getAttributeByIdWitSelectableValues(String alias) {
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("attribute-with-selectable-values");
        TypedQuery<Attribute> query = entityManager.createQuery("SELECT a FROM Attribute as a where a.alias=:alias and a.enabled=true", Attribute.class);
        query.setParameter("alias", alias);
        query.setHint("javax.persistence.fetchgraph", entityGraph);
        Optional<Attribute> resultOptional = query.getResultStream().findFirst();
        if (resultOptional.isPresent()) {
            return resultOptional.get();
        }
        throw new ResourceNotFoundException("Не найден атрибут с псевдонимом " + alias);
    }

    public Attribute getAttributeByIdWitSelectableValues(Long id) {
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("attribute-with-selectable-values");
        TypedQuery<Attribute> resultQuery = entityManager.
                createQuery("SELECT a from Attribute a where a.enabled=true and a.id =:id", Attribute.class);
        resultQuery.setParameter("id", id);
        resultQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        Optional<Attribute> resultOptional = resultQuery.getResultStream().findFirst();
        if (resultOptional.isPresent()) {
            return resultOptional.get();
        }
        throw new ResourceNotFoundException("Не найден атрибут с id " + id);
    }


    private void clearValueWhereChangeAttributeType(Attribute oldAttribute) {
        String queryString = String.format("DELETE FROM %s as v where v.attribute =:attribute", oldAttribute.getType().getTableName());
        Query query = entityManager.createQuery(queryString);
        query.setParameter("attribute", oldAttribute);
        query.executeUpdate();
    }


    public Set<Attribute> getListAttributeByAliases(List<String> aliases) {
        TypedQuery<Attribute> query = entityManager.
                createQuery("SELECT a FROM Attribute as a where a.alias in (:aliases) and a.enabled=true ", Attribute.class);
        query.setParameter("aliases", aliases);
        Set<Attribute> attributeSet = new HashSet<>();
        query.getResultStream().forEach(attributeSet::add);
        return attributeSet;
    }

    public Set<Attribute> getListAttributeByAliasesWithValue(List<String> aliases) {
        TypedQuery<Attribute> querySelValue = entityManager.
                createQuery("SELECT a FROM Attribute as a LEFT JOIN FETCH a.singleSelectableValue where a.alias in (:aliases) and a.enabled=true ", Attribute.class);
        querySelValue.setParameter("aliases", aliases);
        Set<Attribute> resultSet = new HashSet<>();
        querySelValue.getResultStream().forEach(resultSet::add);
        TypedQuery<Attribute> queryDoubleValue = entityManager.
                createQuery("SELECT a FROM Attribute as a LEFT JOIN FETCH a.singleSelectableValue where a.alias in (:aliases) and a.enabled=true ", Attribute.class);
        queryDoubleValue.setParameter("aliases", aliases);
        queryDoubleValue.getResultStream().forEach(resultSet::add);
        return resultSet;
    }
    public Set<Attribute> attributesAliasBySelValueIds(List<Long> selValueIds) {
        TypedQuery<Attribute> query = entityManager.createQuery("SELECT distinct a FROM SelectableValue as sv  join sv.attribute as a where sv.id in (:ids)", Attribute.class);
        query.setParameter("ids", selValueIds);
        return query.getResultStream().collect(Collectors.toSet());
    }

    @Transactional
    public Attribute updateAttribute(RequestPatchAttributeDto dto) {
        Attribute attribute = entityManager.find(Attribute.class, dto.getId());
        /*Была ли смена типа атрибута*/
        if (dto.getType() != null) {
            /*Если была смена атрибута сначала удаляем старые значения*/
            if (!attribute.getType().equals(dto.getType())) {
                clearValueWhereChangeAttributeType(attribute);
            }
            attribute.setType(dto.getType());
        }
        if (dto.getFilter() != null) {
            attribute.setFilter(dto.getFilter());
        }
        if (dto.getAlias() != null) {
            attribute.setAlias(dto.getAlias());
        }
        if (dto.getName() != null) {
            attribute.setName(dto.getName());
        }
        attribute.setModifyDate(LocalDateTime.now());
        return attribute;
    }


}
