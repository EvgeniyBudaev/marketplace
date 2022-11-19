package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.converters.ProductConverters;
import com.marketplace.backend.dto.request.product.RequestSaveProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class ProductService implements ProductDao {
    private final ProductConverters productConverters;
    private final ProductRepository productRepository;
    private final EntityManager entityManager;

    private final CatalogDao catalogDao;

    public ProductService(ProductConverters productConverters, ProductRepository productRepository, EntityManager entityManager, CatalogDao catalogDao) {
        this.productConverters = productConverters;
        this.productRepository = productRepository;
        this.entityManager = entityManager;
        this.catalogDao = catalogDao;
    }

    @Override
    public List<Product> getAll() {
        List<Product> list = new ArrayList<>();
        productRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product save(RequestSaveProductDto dto) {
        Catalog catalog = catalogDao.findById(dto.getCatalogId());
        Product product = productConverters.requestSaveProductDtoToProduct(dto,catalog);
        productRepository.save(product);
        return  product;
    }

    @Override
    public List<Product> findProductsInCatalogByAlias(String alias) {
        Query query = entityManager.createQuery("select p from Product as p where p.catalog.alias=:alias");
        query.setParameter("alias",alias);
        return query.getResultList();
    }

    @Override
    public Product findById(Long id) {
        return  productRepository.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Page<Product> productWithPage(Integer pageNumber, Integer countOfPage) {
        Pageable pageRequest = PageRequest.of(pageNumber, countOfPage);
        return productRepository.findAll(pageRequest);
    }

    @Override
    public Product findProductByAlias(String alias) {
       return productRepository.findProductByAlias(alias).orElseThrow();
    }






}
