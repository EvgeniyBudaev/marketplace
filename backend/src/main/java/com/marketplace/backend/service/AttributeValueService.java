package com.marketplace.backend.service;

import com.marketplace.backend.dto.catalog.response.single.NumberAttributeDto;
import com.marketplace.backend.model.values.SelectableValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AttributeValueService {
    @PersistenceContext
    private final EntityManager entityManager;
    @Autowired
    public AttributeValueService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Set<NumberAttributeDto> findNumberAttributesInCatalog (Long catalogId){
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
}
