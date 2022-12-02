package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.converters.ProductConverters;
import com.marketplace.backend.dto.request.product.RequestSaveProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Map;


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
    public Paging<Product> findProductsInCatalogByAlias(String alias, Integer page, Integer pageSize, Map<String,String> filters) {
        /*Получаем общее количество элементов результата запроса*/
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = criteriaBuilder
                .createQuery(Long.class);
        countQuery.select(criteriaBuilder
                .count(countQuery.from(Product.class)));
        Long count = entityManager.createQuery(countQuery)
                .getSingleResult();
        /*Бъем на страницы*/
        CriteriaQuery<Product> criteriaQuery = criteriaBuilder
                .createQuery(Product.class);
        Root<Product> from = criteriaQuery.from(Product.class);
        CriteriaQuery<Product> select = criteriaQuery.select(from);
        TypedQuery<Product> typedQuery = entityManager.createQuery(select);
        Paging<Product> result = new Paging<>();
            result.setPageSize(pageSize);
            result.setCurrentPage(page);
            typedQuery.setFirstResult(page - 1);
            typedQuery.setMaxResults(pageSize);
            result.setContent(typedQuery.getResultList());
            return result;
    }

    @Override
    public Product findProductByAlias(String alias) {
       return productRepository.findProductByAlias(alias).orElseThrow();
    }






}
