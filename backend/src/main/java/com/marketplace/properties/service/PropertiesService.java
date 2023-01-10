package com.marketplace.properties.service;


import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.Property;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

@Service
public class PropertiesService {
    private final EntityManager entityManager;

    public PropertiesService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Property getPropertyByType(EPropertiesType type){
        TypedQuery<Property> query = entityManager
                .createQuery("SELECT p FROM Property as p where p.propertiesType=:type", Property.class);
        query.setParameter("type",type);
        return query.getSingleResult();
    }

}
