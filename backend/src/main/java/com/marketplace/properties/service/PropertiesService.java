package com.marketplace.properties.service;


import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.Property;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class PropertiesService {
    private final EntityManager entityManager;

    public PropertiesService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public Property getPropertyByType(EPropertiesType type){
        TypedQuery<Property> query = entityManager
                .createQuery("SELECT p FROM Property as p where p.propertiesType=:type", Property.class);
        query.setParameter("type",type);
        Optional<Property> property = query.getResultStream().findFirst();
        return property.orElseThrow(()->new RuntimeException("Не удалось загрузить проперти для "+type.name()));
    }

}
