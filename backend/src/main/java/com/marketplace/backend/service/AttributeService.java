package com.marketplace.backend.service;

import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.dto.attributes.request.RequestPatchAttribute;
import com.marketplace.backend.dto.attributes.request.RequestSaveAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.AttributeMapper;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class AttributeService implements AttributeDao {
    @PersistenceContext
    private final EntityManager entityManager;
    private final AttributeMapper attributeMapper;
    private final SelectableValueMapper selectableValueMapper;
    private final AttributeValueService attributeValueService;


    @Autowired
    public AttributeService(EntityManager entityManager, AttributeValueService attributeValueService) {

        this.entityManager = entityManager;
        this.attributeValueService = attributeValueService;
        this.attributeMapper = Mappers.getMapper(AttributeMapper.class);
        this.selectableValueMapper = Mappers.getMapper(SelectableValueMapper.class);
    }

    @Override
    @Transactional(rollbackFor = {ResourceNotFoundException.class})
    public Attribute saveAttribute(RequestSaveAttribute dto) {
        Attribute attribute = attributeMapper.dtoToEntity(dto);
        entityManager.persist(attribute);
        if(attribute.getFilter()==null){
            attribute.setFilter(true);
        }
        if(attribute.getEnabled()==null){
            attribute.setEnabled(true);
        }
        if(dto.getType().equals(EAttributeType.SELECTABLE)){
            if(dto.getSelectable()!=null){
                List<SelectableValue> newValuesSet = selectableValueMapper.dtoListToEntitySet(dto.getSelectable());
                newValuesSet.forEach(x->x.setAttribute(attribute));
                saveSelectableValues(attribute,newValuesSet);
                attribute.setSingleSelectableValue(new HashSet<>(newValuesSet));
            }else {
                throw new OperationNotAllowedException("В атрибуте с данным типом должно присутствовать хотя бы одно значение");
            }
        }
        return attribute;
    }
    private void saveSelectableValues(Attribute newAttribute, List<SelectableValue> newValueList) {
        newValueList.forEach(x->{
            if(x.getId()==null){
                entityManager.persist(x);
            }else {
                entityManager.merge(x);
            }
            newAttribute.addSelValue(x);
        });
    }


    @Transactional
    public Integer delete(String alias) {
        Attribute attribute = getAttributeByIdWitSelectableValues(alias);
        attributeValueService.deleteValuesByAttribute(attribute,attribute.getType().getTableName());
        Query queryAttribute = entityManager.createQuery("DELETE FROM Attribute as a where a.alias=:alias");
        queryAttribute.setParameter("alias",alias);
        return queryAttribute.executeUpdate();
    }
    @Override
    @Transactional
    public Paging<ResponseAttributeForGetAll> findAll(Integer page, Integer pageSize){
        TypedQuery<Long> query = entityManager.createQuery("SELECT count (a) from Attribute a where a.enabled=true",Long.class);
        Integer count =  Math.toIntExact(query.getSingleResult());
        Paging<ResponseAttributeForGetAll> result = new Paging<>(count,pageSize,page);
        TypedQuery<Attribute> resultQuery = entityManager.createQuery("SELECT a from Attribute a where a.enabled=true", Attribute.class);
        resultQuery.setFirstResult((page-1)*pageSize );
        resultQuery.setMaxResults(pageSize);
        List<ResponseAttributeForGetAll> dtoList = attributeMapper.entitiesToListDto(resultQuery.getResultList());
        result.setContent(dtoList);
        return result;
    }

    /*Выдаем аттрибут только если enabled=true*/
    @Override
    @Transactional
    public Attribute getAttributeByIdWitSelectableValues(String alias){
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("attribute-with-selectable-values");
        TypedQuery<Attribute> query = entityManager.createQuery("SELECT a FROM Attribute as a where a.alias=:alias and a.enabled=true", Attribute.class);
        query.setParameter("alias",alias);
        query.setHint("javax.persistence.fetchgraph", entityGraph);
        Optional<Attribute> resultOptional = query.getResultStream().findFirst();
        if(resultOptional.isPresent()){
            return resultOptional.get();
        }
        throw new ResourceNotFoundException("Не найден атрибут с псевдонимом "+alias);
    }

    public Attribute getAttributeByIdWitSelectableValues(Long id){
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("attribute-with-selectable-values");
        TypedQuery<Attribute> resultQuery = entityManager.
                createQuery("SELECT a from Attribute a where a.enabled=true and a.id =:id", Attribute.class);
        resultQuery.setParameter("id",id);
        resultQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        Optional<Attribute> resultOptional = resultQuery.getResultStream().findFirst();
        if(resultOptional.isPresent()){
            return resultOptional.get();
        }
        throw new ResourceNotFoundException("Не найден атрибут с id "+id);
    }



    private void clearValueWhereChangeAttributeType(Attribute oldAttribute){
        String queryString = String.format("DELETE FROM %s as v where v.attribute =:attribute",oldAttribute.getType().getTableName());
        Query query = entityManager.createQuery(queryString);
        query.setParameter("attribute",oldAttribute);
        query.executeUpdate();
    }


    public Set<Attribute> getListAttributeByAliases(List<String> aliases){
        TypedQuery<Attribute> query = entityManager.
                createQuery("SELECT a FROM Attribute as a where a.alias in (:aliases) and a.enabled=true ",Attribute.class);
        query.setParameter("aliases",aliases);
        Set<Attribute> attributeSet = new HashSet<>();
        query.getResultStream().forEach(attributeSet::add);
        return attributeSet;
    }



    public Set<Attribute> attributesAliasBySelValueIds(List<Long> selValueIds){
        TypedQuery<Attribute> query = entityManager.createQuery("SELECT distinct a FROM SelectableValue as sv  join sv.attribute as a where sv.id in (:ids)", Attribute.class);
        query.setParameter("ids",selValueIds);
        return query.getResultStream().collect(Collectors.toSet());
    }

    @Transactional
    public Attribute updateAttribute(RequestPatchAttribute dto){
        Attribute attribute = entityManager.find(Attribute.class,dto.getId());
        /*Была ли смена типа атрибута*/
        if (dto.getType()!=null){
            /*Если была смена атрибута сначала удаляем старые значения*/
            if(!attribute.getType().equals(dto.getType())){
                clearValueWhereChangeAttributeType(attribute);
            }
            attribute.setType(dto.getType());
        }
        if(dto.getFilter()!=null){
            attribute.setFilter(dto.getFilter());
        }
        if(dto.getAlias()!=null){
            attribute.setAlias(dto.getAlias());
        }
        if(dto.getName()!=null){
            attribute.setName(dto.getName());
        }
        attribute.setModifyDate(LocalDateTime.now());
        return attribute;
    }





}
