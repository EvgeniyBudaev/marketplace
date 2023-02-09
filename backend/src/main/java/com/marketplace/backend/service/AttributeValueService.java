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
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
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
    public AttributeValueService(EntityManager entityManager) {
        this.entityManager = entityManager;
        selectableValueMapper = Mappers.getMapper(SelectableValueMapper.class);
    }

    public Set<NumberAttributeDto> findNumberAttributesUseInCatalog(Long catalogId){
        TypedQuery<NumberAttributeDto> doubleValueQuery = entityManager
                .createQuery("SELECT distinct new com.marketplace.backend." +
                        "dto.catalog.response.single" +
                        ".NumberAttributeDto(at.id,at.name,at.alias,min (dv.value),max (dv.value)) " +
                        "from Product as p left join p.doubleValues as dv " +
                        "left join dv.attribute as at where p.catalog.id =: catalogId group by at", NumberAttributeDto.class);
        doubleValueQuery.setParameter("catalogId",catalogId);
        return doubleValueQuery.getResultStream().filter(x->x.getId()!=null).collect(Collectors.toSet());
    }

    public Set<SelectableValue> findSelectableAttributesInCatalog(Long catalogId){
        TypedQuery<SelectableValue> selectableValueQuery = entityManager
                .createQuery("select distinct sv from Product as p  join p.selectableValues as sv where p.catalog.id=:catalogId", SelectableValue.class);
        selectableValueQuery.setParameter("catalogId",catalogId);
        Stream<SelectableValue> stream = selectableValueQuery.getResultStream();
        return stream.collect(Collectors.toUnmodifiableSet());
    }

    @Transactional
    public void saveSelectableValue(RequestSaveSelValueDto dto){
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
    }



    @Transactional
    public void deleteValuesByAttribute(Attribute attribute, String tableName){
        String queryString = String.format( "DELETE FROM %s as v where v.attribute=:attribute",tableName);
        Query query = entityManager.createQuery(queryString);
        query.setParameter("attribute",attribute);
        query.executeUpdate();
    }

    @Transactional
    public void deleteById(Long id){
        Query query = entityManager.createQuery("DELETE FROM SelectableValue where id=:id");
        query.setParameter("id",id);
        query.executeUpdate();
    }

    @Transactional
    public void updateSelectableValue(RequestUpdateSelValueDto dto){
        Query query = entityManager
                .createQuery("UPDATE SelectableValue as sv set sv.value = :value where sv.id = :id");
        query.setParameter("value",dto.getValue());
        query.setParameter("id",dto.getId());
        query.executeUpdate();
    }


}
