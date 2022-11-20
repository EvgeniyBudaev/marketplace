package com.marketplace.backend.service;

import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.repository.AttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttributeService implements AttributeDao {
    @Autowired
    AttributeRepository attributeRepository;

    @Override
    public List<Attribute> getAll() {
        return attributeRepository.findAll();
    }

    @Override
    public void save(Attribute obj) {
        attributeRepository.save(obj);
    }

    @Override
    public Attribute findById(Long id) {
        Attribute attribute = null;
        Optional<Attribute> optional = attributeRepository.findById(id);
        if (optional.isPresent()) {
            attribute = optional.get();
        }
        return attribute;
    }

    @Override
    public void delete(Long id) {
        attributeRepository.deleteById(id);
    }
}
