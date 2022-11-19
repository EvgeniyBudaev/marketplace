package com.marketplace.backend.dao;

import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.model.Catalog;

public interface CatalogDao extends GeneralDao<Catalog> {

    Catalog save(RequestSaveCatalogDto dto);
    Catalog findCatalogByAlias(String alias);
}
