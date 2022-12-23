package com.marketplace.backend.controller;


import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.dto.attributes.request.RequestSaveNonSelectableAttribute;
import com.marketplace.backend.dto.attributes.request.RequestSaveSelectableAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.dto.attributes.response.ResponseNonSelectableAttributeAfterSave;
import com.marketplace.backend.dto.attributes.response.ResponseSelectableAttributeAfterSave;
import com.marketplace.backend.dto.attributes.response.ResponseSingleAttributeByAlias;
import com.marketplace.backend.model.Paging;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/attributes")
public class AttributeController {
    private final AttributeDao attributeDao;

    public AttributeController(AttributeDao attributeDao) {
        this.attributeDao = attributeDao;
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @GetMapping("/page")
    public Paging<ResponseAttributeForGetAll> showAllAttributes(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                                @RequestParam(name = "size", defaultValue = "5") Integer pageSize) {
        if (page < 1) {
            page = 1;
        }
        if (pageSize <1){
            pageSize = 5;
        }
        return attributeDao.showAllAttribute(page,pageSize);
    }

    @GetMapping("by_alias/{alias}")
    public ResponseSingleAttributeByAlias getAttributeByAlias(@PathVariable String alias) {
        return attributeDao.attributeByAlias(alias);
    }

    @PostMapping("/add_selectable")
    public ResponseSelectableAttributeAfterSave addNewSelectableAttribute(@RequestBody RequestSaveSelectableAttribute attribute) {
        return attributeDao.saveSelectable(attribute);

    }
    @PostMapping("/add")
    public ResponseNonSelectableAttributeAfterSave addNewAttribute(@RequestBody RequestSaveNonSelectableAttribute attribute) {
        return attributeDao.saveNonSelectable(attribute);
    }


    @DeleteMapping("{id}")
    public String deleteAttribute(@PathVariable long id) {
        return null;
    }
}
