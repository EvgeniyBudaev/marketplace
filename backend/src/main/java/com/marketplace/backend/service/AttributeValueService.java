package com.marketplace.backend.service;

import com.marketplace.backend.dto.catalog.response.single.NumberAttributeDto;
import com.marketplace.backend.dto.values.request.RequestSaveSelValueDto;
import com.marketplace.backend.dto.values.request.RequestUpdateSelValueDto;
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.values.SelectableValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AttributeValueService {
    @PersistenceContext
    private final EntityManager entityManager;
    private final SelectableValueMapper selectableValueMapper;
    @Autowired
    public AttributeValueService(EntityManager entityManager, SelectableValueMapper selectableValueMapper) {
        this.entityManager = entityManager;
        this.selectableValueMapper = selectableValueMapper;
    }

    public Set<NumberAttributeDto> findUseNumberAttributesUseInCatalog(Long catalogId){
        TypedQuery<NumberAttributeDto> doubleValueQuery = entityManager
                .createQuery("SELECT distinct new com.marketplace.backend." +
                        "dto.catalog.response.single" +
                        ".NumberAttributeDto(at.id,at.name,at.alias,min (dv.value),max (dv.value)) " +
                        "from Product as p left join p.doubleValues as dv " +
                        "left join dv.attribute as at where p.catalog.id =: catalogId group by at", NumberAttributeDto.class);
        doubleValueQuery.setParameter("catalogId",catalogId);
        return doubleValueQuery.getResultStream().filter(x->x.getId()!=null).collect(Collectors.toSet());
    }

    public Set<SelectableValue> findUseSelectableAttributesInCatalog(Long catalogId){
        TypedQuery<SelectableValue> selectableValueQuery = entityManager
                .createQuery("select distinct sv from Product as p  join p.selectableValues as sv where p.catalog.id=:catalogId", SelectableValue.class);
        selectableValueQuery.setParameter("catalogId",catalogId);
        Stream<SelectableValue> stream = selectableValueQuery.getResultStream();
        return stream.collect(Collectors.toUnmodifiableSet());
    }

    @Transactional
    public Set<SelectableValue> saveSelectableValue(RequestSaveSelValueDto dto){
        TypedQuery<Attribute> query = entityManager.
                createQuery("SELECT a FROM Attribute as a where a.alias=:alias", Attribute.class);
        query.setParameter("alias",dto.getAttributeAlias());
        Optional<Attribute> resultOptional = query.getResultStream().findFirst();
        if(resultOptional.isEmpty()){
            throw new ResourceNotFoundException("Не найден атрибут с псевдонимом "+dto.getAttributeAlias());
        }
        Attribute attribute= resultOptional.get();
        if(!attribute.getType().equals(EAttributeType.SELECTABLE)){
            throw new OperationNotAllowedException("Данный атрибут не поддерживает строковые значения");
        }
        SelectableValue value = selectableValueMapper.saveDtoToEntity(dto);
        value.setAttribute(attribute);
        entityManager.persist(value);
        TypedQuery<SelectableValue> valueTypedQuery = entityManager
                .createQuery("SELECT sv FROM SelectableValue as sv where sv.attribute=:attribute", SelectableValue.class);
        valueTypedQuery.setParameter("attribute",attribute);
        return valueTypedQuery.getResultStream().collect(Collectors.toSet());
    }



    @Transactional
    public void deleteValuesByAttribute(Attribute attribute, String tableName){
        String queryString = String.format( "DELETE FROM %s as v where v.attribute=:attribute",tableName);
        Query query = entityManager.createQuery(queryString);
        query.setParameter("attribute",attribute);
        query.executeUpdate();
    }

    @Transactional
    public List<Object[]> deleteById(Long id){
        Query selListQuery = entityManager.
                createNativeQuery("select sv2.id, sv2.value, a.id as attributeId from selectable_values as sv2 right join attributes a on a.id = sv2.attribute_id\n" +
                        "                                            right join selectable_values as sv on sv.attribute_id=a.id where sv.id =:id");
        selListQuery.setParameter("id",id);
        List<Object[]> result = selListQuery.getResultList();
        Query query = entityManager.createQuery("DELETE FROM SelectableValue where id=:id");
        query.setParameter("id",id);
        query.executeUpdate();
        return result;
    }

    @Transactional
    public List<Object[]> updateSelectableValue(RequestUpdateSelValueDto dto){
        Query query = entityManager
                .createQuery("UPDATE SelectableValue as sv set sv.value = :value where sv.id = :id");
        query.setParameter("value",dto.getValue());
        query.setParameter("id",dto.getId());
        query.executeUpdate();
        Query selListQuery = entityManager.
                createNativeQuery("select sv2.id, sv2.value, a.id as attributeAlias from selectable_values as sv2 right join attributes a on a.id = sv2.attribute_id\n" +
                        "                                            right join selectable_values as sv on sv.attribute_id=a.id where sv.id =:id");
        selListQuery.setParameter("id",dto.getId());
        return (List<Object[]>) selListQuery.getResultList();

    }

    @Transactional
    public void deleteSelectableValues(Collection<SelectableValue> values){
        Query deleteQuery = entityManager.createQuery("DELETE FROM SelectableValue sv where sv in(:values)");
        deleteQuery.setParameter("values",values);
        deleteQuery.executeUpdate();
    }

    @Transactional
    public void updateAttributeModifyDate(String alias){
        Query updateQuery = entityManager
                .createQuery("UPDATE Attribute set modifyDate=:time where alias=:alias");
        updateQuery.setParameter("time", LocalDateTime.now());
        updateQuery.setParameter("alias",alias);
        updateQuery.executeUpdate();
    }
    @Transactional
    public void updateAttributeModifyDate(Long attributeId){
        Query updateQuery = entityManager
                .createQuery("UPDATE Attribute set modifyDate=:time where id=:id");
        updateQuery.setParameter("time", LocalDateTime.now());
        updateQuery.setParameter("id",attributeId);
        updateQuery.executeUpdate();
    }

}
