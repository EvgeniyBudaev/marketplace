package com.marketplace.backend.controller;


import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.dto.attributes.request.RequestSaveOrUpdateAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.dto.attributes.response.ResponseSingleAttribute;
import com.marketplace.backend.mappers.AttributeMapper;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Paging;
import org.mapstruct.factory.Mappers;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/attributes")
public class AttributeController {
    private final AttributeDao attributeDao;
    private final AttributeMapper attributeMapper;
    private final SelectableValueMapper selectableValueMapper;

    public AttributeController(AttributeDao attributeDao) {
        this.attributeDao = attributeDao;
        this.attributeMapper = Mappers.getMapper(AttributeMapper.class);
        this.selectableValueMapper = Mappers.getMapper(SelectableValueMapper.class);
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
    public ResponseSingleAttribute getAttributeByAlias(@PathVariable String alias) {
        Attribute attribute = attributeDao.attributeByAlias(alias);
        return attributeMapper.entityToSingleAttributeDto(attribute);
    }

    @PostMapping("/save")
    public ResponseSingleAttribute addNewAttribute(@RequestBody RequestSaveOrUpdateAttribute dto) {
       Attribute attribute =  attributeDao.saveOrUpdateAttribute(dto);
       ResponseSingleAttribute resultDto = attributeMapper.entityToSingleAttributeDto(attribute);
       if(!attribute.getSingleSelectableValue().isEmpty()){
           resultDto.setSelectable(selectableValueMapper.entityListToDtoList(attribute.getSingleSelectableValue()));
       }
       return resultDto;
    }


    @DeleteMapping("{id}")
    public String deleteAttribute(@PathVariable long id) {
        return null;
    }
}
