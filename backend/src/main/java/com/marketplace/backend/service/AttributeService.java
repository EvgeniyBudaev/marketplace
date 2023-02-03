package com.marketplace.backend.service;

import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.dto.attributes.request.RequestSaveOrUpdateAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.AttributeMapper;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.repository.AttributeRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class AttributeService implements AttributeDao {
    private final AttributeRepository attributeRepository;
    @PersistenceContext
    private final EntityManager entityManager;

    private final AttributeMapper attributeMapper;
    private final SelectableValueMapper selectableValueMapper;

    private final AttributeValueService attributeValueService;


    @Autowired
    public AttributeService(AttributeRepository attributeRepository,
                            EntityManager entityManager, AttributeValueService attributeValueService) {
        this.attributeRepository = attributeRepository;
        this.entityManager = entityManager;
        this.attributeValueService = attributeValueService;
        this.attributeMapper = Mappers.getMapper(AttributeMapper.class);
        this.selectableValueMapper = Mappers.getMapper(SelectableValueMapper.class);
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
    public Attribute getAttributeByAlias(String alias){
        return attributeRepository.
                findAttributeByAliasAndEnabledIsTrue(alias).
                orElseThrow(()->new ResourceNotFoundException("Атрибут с псевдонимом "+alias+" не найден"));
    }

    /*Сохранение или апдейт ориентируемся на поле id если id null то это новый
    * При изменении типа атрибута все сохраненненые значения для старого типа удаляются
    * то есть если был числовой тип а потом стал selectable  все числовые значения заведенные для
    * продуктов будут удалены*/
    @Override
    @Transactional
    public Attribute saveOrUpdateAttribute(RequestSaveOrUpdateAttribute dto) {
        Attribute attribute = attributeMapper.dtoToEntity(dto);
        if(attribute.getFilter()==null){
            attribute.setFilter(true);
        }
        if(attribute.getEnabled()==null){
            attribute.setEnabled(true);
        }
        if(dto.getSelectable()!=null){
            List<SelectableValue> values =
                    selectableValueMapper.dtoListToEntityList(dto.getSelectable());
            values.forEach(x->x.setAttribute(attribute));
            attribute.setSingleSelectableValue(values);
        }
        if(attribute.getId()==null){
            return saveNewEntity(attribute);
        }
        return updateEntity(attribute);
    }
    @Transactional
    public Attribute saveNewEntity(Attribute attribute){
        entityManager.persist(attribute);
        return attribute;
    }

    @Transactional(rollbackFor = {ResourceNotFoundException.class})
    public Attribute updateEntity(Attribute newAttribute){
        Attribute oldAttribute = getAttributeByIdWitSelectableValues(newAttribute.getId());
        entityManager.detach(oldAttribute);
        /*если поменяли тип атрибута то удаляем значения которые были у старого атрибута*/
        if(!oldAttribute.getType().equals(newAttribute.getType())){
            clearValueWhereChangeAttributeType(oldAttribute);
        }
        /*У Selectable должно быть заполнено List<SingleSelectableValue> которые так же надо сохранить*/
        if(newAttribute.getType().equals(EAttributeType.SELECTABLE)){
            return updateSelectable(newAttribute,oldAttribute);
        }
        return updateAttribute(newAttribute);
    }
    private void clearValueWhereChangeAttributeType(Attribute oldAttribute){
        String queryString = String.format("DELETE FROM %s as v where v.attribute =:attribute",oldAttribute.getType().getTableName());
        Query query = entityManager.createQuery(queryString);
        query.setParameter("attribute",oldAttribute);
        query.executeUpdate();
    }

    private Attribute updateSelectable(Attribute newAttribute,Attribute oldAttribute){
        List<SelectableValue> oldValueList = oldAttribute.getSingleSelectableValue();
        List<SelectableValue> newValueList = newAttribute.getSingleSelectableValue();
        newValueList.forEach(attributeValueService::saveSelectableValue);
        List<Long> valueIdListForDelete = new ArrayList<>();
        oldValueList.forEach((x)->{
            if(!newValueList.contains(x)){
                valueIdListForDelete.add(x.getId());
            }
        });
        attributeValueService.deleteSelectableValueInListId(valueIdListForDelete);
        updateAttribute(newAttribute);
        newAttribute.setSingleSelectableValue(newValueList);
        return newAttribute;
    }
    private Attribute updateAttribute(Attribute newAttribute){
        Query updateQuery = entityManager.createQuery("UPDATE Attribute as a set a.alias =:alias," +
                " a.name =:name, a.enabled =:enabled, a.filter = :filter, a.type = :aType where a.id = :id");
        updateQuery.setParameter("alias",newAttribute.getAlias());
        updateQuery.setParameter("name",newAttribute.getName());
        updateQuery.setParameter("enabled",newAttribute.getEnabled());
        updateQuery.setParameter("filter",newAttribute.getFilter());
        updateQuery.setParameter("aType",newAttribute.getType());
        updateQuery.setParameter("id",newAttribute.getId());
        updateQuery.executeUpdate();
        return newAttribute;
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

    public Set<Attribute> getListAttributeByAliases(List<String> aliases){
        TypedQuery<Attribute> query = entityManager.
                createQuery("SELECT a FROM Attribute as a where a.alias in (:aliases) and a.enabled=true ",Attribute.class);
        query.setParameter("aliases",aliases);
        Set<Attribute> attributeSet = new HashSet<>();
        query.getResultStream().forEach(attributeSet::add);
        return attributeSet;
    }

    public Integer delete(String alias) {
       Attribute attribute = getAttributeByAlias(alias);
       attributeValueService.deleteValuesByAttributeAlias(alias,attribute.getType().getTableName());
       Query queryAttribute = entityManager.createQuery("DELETE FROM Attribute as a where a.alias=:alias");
       queryAttribute.setParameter("alias",alias);
       return queryAttribute.executeUpdate();
    }

    public Set<Attribute> attributesAliasBySelValueIds(List<Long> selValueIds){
        TypedQuery<Attribute> query = entityManager.createQuery("SELECT distinct a FROM SelectableValue as sv  join sv.attribute as a where sv.id in (:ids)", Attribute.class);
        query.setParameter("ids",selValueIds);
        return query.getResultStream().collect(Collectors.toSet());
    }

}
