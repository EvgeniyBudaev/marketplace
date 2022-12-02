package com.marketplace.backend.controller;


import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.model.Attribute;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attributes")
public class AttributeController {
    private final AttributeDao attributeDao;

    public AttributeController(AttributeDao attributeDao) {
        this.attributeDao = attributeDao;
    }

    /*TODO обернуть page*/
    @GetMapping
    public List<Attribute> showAllAttributes() {
        return null;
    }

    @GetMapping("/{id}")
    public Attribute getAttribute(@PathVariable long id) {
        return null;
    }

    @PostMapping
    public Attribute addNewAttribute(@RequestBody Attribute attribute) {
        attributeDao.save(attribute);
        return attribute;
    }


    @DeleteMapping("{id}")
    public String deleteAttribute(@PathVariable long id) {
        return null;
    }
}
