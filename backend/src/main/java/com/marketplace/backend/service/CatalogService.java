package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.converters.CatalogConverters;
import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.repository.CatalogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogService implements CatalogDao {

    private final CatalogRepository catalogRepository;
    private final CatalogConverters catalogConverters;

    public CatalogService(CatalogRepository catalogRepository, CatalogConverters catalogConverters) {
        this.catalogRepository = catalogRepository;
        this.catalogConverters = catalogConverters;
    }

    @Override
    public List<Catalog> getAll() {
        return catalogRepository.findAll();
    }

    @Override
    public void save(Catalog catalog) {
        catalogRepository.save(catalog);
    }

    @Override
    public Catalog save(RequestSaveCatalogDto dto) {
        Catalog catalog = catalogConverters.convertRequestSaveCatalogDtoToCatalog(dto);
        catalogRepository.save(catalog);
        return catalog;
    }

    @Override
    public Catalog findCatalogByAlias(String alias) {
        return catalogRepository.findCatalogByAlias(alias).orElseThrow();
    }

    @Override
    public Catalog findById(Long id) {
        return catalogRepository.findById(id).orElseThrow();
    }

    /*TODO надо ли проверять что каталог пустой перед удалением надоли ли удалять все что в каталоге*/
    @Override
    public void delete(Long id) {
        catalogRepository.deleteById(id);
    }


}
