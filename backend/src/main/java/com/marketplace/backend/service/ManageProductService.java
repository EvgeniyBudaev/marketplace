package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dao.ManageProductDao;
import com.marketplace.backend.dto.product.ProductConverters;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

@Service
public class ManageProductService implements ManageProductDao {
    private final ProductRepository productRepository;
    private final EntityManager entityManager;
    private final CatalogDao catalogDao;
    private final ProductConverters productConverters;

    public ManageProductService(ProductRepository productRepository, EntityManager entityManager, CatalogDao catalogDao, ProductConverters productConverters) {
        this.productRepository = productRepository;
        this.entityManager = entityManager;
        this.catalogDao = catalogDao;
        this.productConverters = productConverters;
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public void delete(String alias) {
        Query query = entityManager
                .createQuery("UPDATE Product as p set p.enabled=false where p.alias=:alias");
        query.setParameter("alias", alias);
        query.executeUpdate();
    }

    @Override
    @Transactional
    public Product save(RequestSaveProductDto dto) {
        Catalog catalog = catalogDao.findEntityByAlias(dto.getCatalogAlias());
        Product product = productConverters.requestSaveProductDtoToProduct(dto, catalog);
        productRepository.save(product);
        return product;
    }
}
