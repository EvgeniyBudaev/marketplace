package com.marketplace.backend.dto.catalog.response.single;

import com.marketplace.backend.model.Catalog;
import lombok.Data;

import java.util.List;


@Data
public class ResponseSingleCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
    private boolean enabled;
    private List<SelectAttributeDto> selectAttribute;
    private List<NumberAttributeDto> numberAttribute;



    public ResponseSingleCatalogDto(Catalog catalog,
                                    List<SelectAttributeDto> selectableValues,
                                    List<NumberAttributeDto> doubleValues){
        this.setId(catalog.getId());
        this.setName(catalog.getName());
        this.setEnabled(catalog.isEnabled());
        this.setAlias(catalog.getAlias());
        this.setImage(catalog.getImage());
        this.setSelectAttribute(selectableValues);
        this.setNumberAttribute(doubleValues);

    }

}
