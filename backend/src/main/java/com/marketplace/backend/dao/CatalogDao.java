package com.marketplace.backend.dao;

import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Paging;

public interface CatalogDao extends GeneralDao<Catalog> {

    Catalog save(RequestSaveCatalogDto dto);
    Catalog findCatalogByAlias(String alias);
    Paging<Catalog> getAll(Integer page, Integer pageSize);
}
