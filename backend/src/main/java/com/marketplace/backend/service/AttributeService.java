package com.marketplace.backend.service;

import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.repository.AttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttributeService implements AttributeDao {
    @Autowired
    AttributeRepository attributeRepository;


    @Override
    public void save(Attribute obj) {
        attributeRepository.save(obj);
    }


    @Override
    public void delete(String alias) {
       return;
    }
}
