package com.marketplace.backend.controller;


import com.marketplace.backend.dto.attributes.request.RequestSaveOrUpdateAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.dto.attributes.response.ResponseSingleAttribute;
import com.marketplace.backend.mappers.AttributeMapper;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.service.AttributeService;
import org.mapstruct.factory.Mappers;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/attributes")
public class AttributeController {
    private final AttributeService attributeDao;
    private final AttributeMapper attributeMapper;
    private final SelectableValueMapper selectableValueMapper;

    public AttributeController(AttributeService attributeDao) {
        this.attributeDao = attributeDao;
        this.attributeMapper = Mappers.getMapper(AttributeMapper.class);
        this.selectableValueMapper = Mappers.getMapper(SelectableValueMapper.class);
    }

   /* @PreAuthorize("hasAuthority('ADMINISTRATOR')")*/
    @GetMapping("/get_all")
    public Paging<ResponseAttributeForGetAll> findAll(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                      @RequestParam(name = "size", defaultValue = "5") Integer size) {
        if (page < 1) {
            page = 1;
        }
        if (size <1){
            size = 5;
        }
        return attributeDao.showAllAttribute(page, size);
    }

    @GetMapping("by_alias/{alias}")
    public ResponseSingleAttribute getAttributeByAlias(@PathVariable String alias) {
        Attribute attribute = attributeDao.getAttributeByAlias(alias);
        ResponseSingleAttribute resultDto = attributeMapper.entityToSingleAttributeDto(attribute);
        if(attribute.getSingleSelectableValue()!=null&&!attribute.getSingleSelectableValue().isEmpty()){
            resultDto.setSelectable(selectableValueMapper.entityListToDtoList(attribute.getSingleSelectableValue()));
        }
        return resultDto;
    }

    @PostMapping("/save")
    public ResponseSingleAttribute saveOrUpdateAttribute(@RequestBody RequestSaveOrUpdateAttribute dto) {
       Attribute attribute =  attributeDao.saveOrUpdateAttribute(dto);
       ResponseSingleAttribute resultDto = attributeMapper.entityToSingleAttributeDto(attribute);
       if(attribute.getSingleSelectableValue()!=null&&!attribute.getSingleSelectableValue().isEmpty()){
           resultDto.setSelectable(selectableValueMapper.entityListToDtoList(attribute.getSingleSelectableValue()));
       }
       return resultDto;
    }


    @DeleteMapping("{alias}")
    public String deleteAttribute(@PathVariable String alias) {
        if(alias==null||alias.isEmpty()){
            return "Недопустимый псевдоним";
        }
        Integer count = attributeDao.delete(alias);
        return "Удалено "+count+" атрибутов";
    }
}
