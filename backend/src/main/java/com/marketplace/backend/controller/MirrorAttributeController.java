package com.marketplace.backend.controller;

import com.marketplace.backend.dao.MirrorAttributeDao;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.model.MirrorAttribute;
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
public class MirrorAttributeController {
    @Autowired
    private MirrorAttributeDao mirrorAttributeDao;

    @GetMapping("/mirrorAttributes")
    public List<MirrorAttribute> showAllCatalogs() {
        return mirrorAttributeDao.getAll();
    }

    @GetMapping("/mirrorAttributes/{id}")
    public MirrorAttribute getMirrorAttribute(@PathVariable long id) {
        return mirrorAttributeDao.getById(id);
    }

    @PostMapping("/mirrorAttributes")
    public MirrorAttribute addNewMirrorAttribute(@RequestBody MirrorAttribute mirrorAttribute) {
        mirrorAttributeDao.save(mirrorAttribute);
        return mirrorAttribute;
    }

    @PutMapping("/mirrorAttributes")
    public MirrorAttribute updateCatalog(@RequestBody MirrorAttribute mirrorAttribute) {
        mirrorAttributeDao.save(mirrorAttribute);
        return mirrorAttribute;
    }

    @DeleteMapping("/mirrorAttributes/{id}")
    public String deleteCatalog(@PathVariable long id) {
        mirrorAttributeDao.delete(id);
        return "Catalog with ID = " + id + " was deleted";
    }
}
