package com.marketplace.backend.dto.catalog.response;

import com.marketplace.backend.model.Catalog;
import lombok.Data;
@Data
public class ResponseSimpleCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;

    public ResponseSimpleCatalogDto(Catalog catalog){
        this.id= catalog.getId();
        this.setAlias(catalog.getAlias());
        this.setId(catalog.getId());
        this.setImage(catalog.getImage());
        this.setName(catalog.getName());
    }
}
