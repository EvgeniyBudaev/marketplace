package com.marketplace.backend.controller;


import com.marketplace.backend.dto.attributes.request.RequestPatchAttributeDto;
import com.marketplace.backend.dto.attributes.request.RequestPutAttributeDto;
import com.marketplace.backend.dto.attributes.request.RequestSaveAttributeDto;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.dto.attributes.response.ResponseSingleAttribute;
import com.marketplace.backend.mappers.AttributeMapper;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.service.AttributeService;
import com.marketplace.backend.service.utils.queryes.QueryParam;
import com.marketplace.backend.service.utils.queryes.UrlResolver;
import com.marketplace.backend.service.utils.queryes.UrlResolverImpl;
import org.mapstruct.factory.Mappers;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/v1/attributes")
public class AttributeController {
    private final AttributeService attributeDao;
    private final AttributeMapper attributeMapper;
    private final SelectableValueMapper selectableValueMapper;

    public AttributeController(AttributeService attributeDao, SelectableValueMapper selectableValueMapper) {
        this.attributeDao = attributeDao;
        this.selectableValueMapper = selectableValueMapper;
        this.attributeMapper = Mappers.getMapper(AttributeMapper.class);
    }

   /* @PreAuthorize("hasAuthority('ADMINISTRATOR')")*/
    @GetMapping("/get_all")
    public Paging<ResponseAttributeForGetAll> findAll(HttpServletRequest request) {
        String rawQueryString = request.getQueryString();
        String queryString = null;
        if (rawQueryString!=null){
            queryString = URLDecoder.decode(rawQueryString, StandardCharsets.UTF_8);
        }
        UrlResolver resolver = new UrlResolverImpl();
        QueryParam param = resolver.resolveQueryString(queryString);
        return attributeDao.findAll(param);
    }

    @GetMapping("by_alias/{alias}")
    public ResponseSingleAttribute getAttributeByAlias(@PathVariable String alias) {
        Attribute attribute = attributeDao.getAttributeByIdWitSelectableValues(alias);
        ResponseSingleAttribute resultDto = attributeMapper.entityToSingleAttributeDto(attribute);
        if(attribute.getSingleSelectableValue()!=null&&!attribute.getSingleSelectableValue().isEmpty()){
            resultDto.setSelectable(selectableValueMapper.entitySetToDtoSet(attribute.getSingleSelectableValue()));
        }
        return resultDto;
    }

    @PostMapping("/save")
    public ResponseSingleAttribute saveAttribute(@RequestBody @Valid RequestSaveAttributeDto dto) {
       Attribute attribute =  attributeDao.saveAttribute(dto);
       ResponseSingleAttribute resultDto = attributeMapper.entityToSingleAttributeDto(attribute);
       if(attribute.getSingleSelectableValue()!=null&&!attribute.getSingleSelectableValue().isEmpty()){
           resultDto.setSelectable(selectableValueMapper.entitySetToDtoSet(attribute.getSingleSelectableValue()));
       }
       return resultDto;
    }

    @PatchMapping("/patch")
    public ResponseSingleAttribute patchAttribute(@RequestBody @Valid RequestPatchAttributeDto dto){
        Attribute attribute =  attributeDao.updateAttribute(dto);
        ResponseSingleAttribute resultDto = attributeMapper.entityToSingleAttributeDto(attribute);
        if(attribute.getSingleSelectableValue()!=null&&!attribute.getSingleSelectableValue().isEmpty()){
            resultDto.setSelectable(selectableValueMapper.entitySetToDtoSet(attribute.getSingleSelectableValue()));
        }
        return resultDto;
    }

    @PutMapping("/put")
    public ResponseSingleAttribute putAttribute(@RequestBody @Valid RequestPutAttributeDto dto){
        Attribute attribute = attributeDao.putAttribute(dto);
        ResponseSingleAttribute resultDto = attributeMapper.entityToSingleAttributeDto(attribute);
        if(attribute.getSingleSelectableValue()!=null&&!attribute.getSingleSelectableValue().isEmpty()){
            resultDto.setSelectable(selectableValueMapper.entitySetToDtoSet(attribute.getSingleSelectableValue()));
        }
        return resultDto;
    }


    @DeleteMapping("delete/{alias}")
    public String deleteAttribute(@PathVariable String alias) {
        if(alias==null||alias.isEmpty()){
            return "Недопустимый псевдоним";
        }
        Integer count = attributeDao.delete(alias);
        return "Удалено "+count+" атрибутов";
    }
}
