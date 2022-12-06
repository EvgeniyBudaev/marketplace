package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.ProductConverters;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;
import java.util.stream.Collectors;


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
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public void delete(String alias) {
        Query query = entityManager
                .createQuery("UPDATE Product as p set p.enabled=false where p.alias=:alias");
        query.setParameter("alias",alias);
        query.executeUpdate();
    }

    @Override
    public Product save(RequestSaveProductDto dto) {
        Catalog catalog = catalogDao.findCatalogByAlias(dto.getCatalogAlias());
        Product product = productConverters.requestSaveProductDtoToProduct(dto,catalog);
        productRepository.save(product);
        return  product;
    }


    @Override
    public Paging<ResponseProductDto> findProductsInCatalog(String alias, Integer page, Integer pageSize, List<String> param) {
        /*Получаем общее количество элементов результата запроса*/
        Query countQuery = entityManager.createQuery("SELECT count(p) from Product as p where p.catalog.alias=:alias");
        countQuery.setParameter("alias",alias);
        Long count = (Long) countQuery.getSingleResult();
        /*Бъем на страницы*/
        Query resultQuery = entityManager.createQuery("SELECT p from Product as p where p.catalog.alias=:alias");
        resultQuery.setParameter("alias",alias);
        Paging<ResponseProductDto> result = new Paging<>(count,pageSize,Long.valueOf(page));
        resultQuery.setFirstResult((page-1)*pageSize );
        resultQuery.setMaxResults(pageSize);
        List<Product> productList = resultQuery.getResultList();
        result.setContent(productList
                .stream().map(x->productConverters.convertProductToResponseProductDto(x,alias))
                .collect(Collectors.toList()));
        return result;
    }

    @Override
    public Product findProductByAlias(String alias) {
       return productRepository.findProductByAlias(alias).orElseThrow();
    }






}
