package com.marketplace.backend.controller;

import com.marketplace.backend.dto.values.request.RequestSaveSelValueDto;
import com.marketplace.backend.dto.values.request.RequestUpdateSelValueDto;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.service.AttributeValueService;
import org.mapstruct.factory.Mappers;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/attributes/values/selectable")
public class SelectableValueController {

    private final AttributeValueService attributeValueService;
    private final SelectableValueMapper selectableValueMapper;

    public SelectableValueController(AttributeValueService attributeValueService) {
        this.attributeValueService = attributeValueService;
        selectableValueMapper = Mappers.getMapper(SelectableValueMapper.class);
    }

    @PatchMapping
    public void  patchValue(@RequestBody RequestUpdateSelValueDto dto){
        attributeValueService.updateSelectableValue(dto);
    }
    @DeleteMapping("{id}")
    public void  deleteValue(@PathVariable(name = "id")Long id){
        attributeValueService.deleteById(id);
    }
    @PostMapping
    public void saveNewValue(@RequestBody RequestSaveSelValueDto dto){
        attributeValueService.saveSelectableValue(dto);
    }
}
