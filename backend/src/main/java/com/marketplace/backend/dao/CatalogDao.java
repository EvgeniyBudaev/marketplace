package com.marketplace.backend.dao;

import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Paging;

public interface CatalogDao extends GeneralDao<Catalog> {

    ResponseSingleCatalogDto save(RequestSaveCatalogDto dto);
    ResponseSingleCatalogDto findCatalogByAlias(String alias);
    Paging<ResponseSimpleCatalogDto> getAll(Integer page, Integer pageSize);
    Catalog findEntityByAlias(String alias);
}
