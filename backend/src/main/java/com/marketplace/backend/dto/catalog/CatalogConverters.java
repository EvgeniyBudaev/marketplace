package com.marketplace.backend.dto.catalog;

import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.model.Catalog;
import org.springframework.stereotype.Service;

@Service
public class CatalogConverters {

    public Catalog convertRequestSaveCatalogDtoToCatalog(RequestSaveCatalogDto dto){
        Catalog catalog = new Catalog();
        catalog.setId(dto.getId());
        catalog.setAlias(dto.getAlias());
        catalog.setName(dto.getName());
        catalog.setImage(dto.getImage());
        catalog.setEnabled(dto.isEnabled());
        return catalog;
    }

}
