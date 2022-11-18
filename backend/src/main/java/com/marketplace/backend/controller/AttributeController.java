package com.marketplace.backend.controller;


import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.model.Attribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AttributeController {
    @Autowired
    private AttributeDao attributeDao;

    @GetMapping("/attributes")
    public List<Attribute> showAllAttributes() {
        return attributeDao.getAll();
    }

    @GetMapping("/attributes/{id}")
    public Attribute getAttribute(@PathVariable long id) {
        return attributeDao.getById(id);
    }

    @PostMapping("/attributes")
    public Attribute addNewAttribute(@RequestBody Attribute attribute) {
        attributeDao.save(attribute);
        return attribute;
    }

    @PutMapping("/attributes")
    public Attribute updateBrand(@RequestBody Attribute attribute) {
        attributeDao.save(attribute);
        return attribute;
    }

    @DeleteMapping("/attributes/{id}")
    public String deleteAttribute(@PathVariable long id) {
        attributeDao.delete(id);
        return "Attribute with ID = " + id + " was deleted";
    }
}
