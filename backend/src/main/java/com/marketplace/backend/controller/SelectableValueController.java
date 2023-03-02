package com.marketplace.backend.controller;

import com.marketplace.backend.dto.values.request.RequestSaveSelValueDto;
import com.marketplace.backend.dto.values.request.RequestUpdateSelValueDto;
import com.marketplace.backend.dto.values.response.ResponseSaveUpdateSelValueDto;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.service.AttributeValueService;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api/v1/attributes/values/selectable")
public class SelectableValueController {

    private final AttributeValueService attributeValueService;
    private final SelectableValueMapper selectableValueMapper;

    public SelectableValueController(AttributeValueService attributeValueService, SelectableValueMapper selectableValueMapper) {
        this.attributeValueService = attributeValueService;
        this.selectableValueMapper = selectableValueMapper;
    }

    @PatchMapping
    public Set<ResponseSaveUpdateSelValueDto> patchValue(@RequestBody RequestUpdateSelValueDto dto){
        List<Object[]> rawResult = attributeValueService.updateSelectableValue(dto);
        if(rawResult.isEmpty()){
            return Collections.emptySet();
        }
        Set<ResponseSaveUpdateSelValueDto> resultDtos = new HashSet<>(rawResult.size());
        long attributeId= 0L;
        for(Object[] object:rawResult){
            ResponseSaveUpdateSelValueDto resultDto = new ResponseSaveUpdateSelValueDto();
            resultDto.setId(((BigInteger) object[0]).longValue());
            resultDto.setValue((String) object[1]);
            resultDto.setAttributeId(((BigInteger) object[2]).longValue());
            resultDtos.add(resultDto);
        }
        attributeValueService.updateAttributeModifyDate(attributeId);
        return resultDtos;
    }
    @DeleteMapping("{id}")
    public Set<ResponseSaveUpdateSelValueDto>  deleteValue(@PathVariable(name = "id")Long id){
        List<Object[]> rawResult = attributeValueService.deleteById(id);
        if(rawResult.isEmpty()){
            return Collections.emptySet();
        }
        HashSet<ResponseSaveUpdateSelValueDto> resultDtos = new HashSet<>(rawResult.size());
        long attributeId= 0L;
        for(Object[] object:rawResult){
            ResponseSaveUpdateSelValueDto resultDto = new ResponseSaveUpdateSelValueDto();
            resultDto.setId(((BigInteger) object[0]).longValue());
            if(resultDto.getId().equals(id)){
                continue;
            }
            resultDto.setValue((String) object[1]);
            resultDto.setAttributeId(((BigInteger) object[2]).longValue());
            attributeId=resultDto.getAttributeId();
            resultDtos.add(resultDto);
        }
        attributeValueService.updateAttributeModifyDate(attributeId);
        return resultDtos;
    }
    @PostMapping
    public Set<ResponseSaveUpdateSelValueDto> saveNewValue(@RequestBody RequestSaveSelValueDto dto){
        Set<SelectableValue> result = attributeValueService.saveSelectableValue(dto);
        attributeValueService.updateAttributeModifyDate(dto.getAttributeAlias());
        return selectableValueMapper.entityValuesSetToDtoSet(result);
    }
}
