package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.ProductConverters;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.repository.ProductRepository;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.ProductQueryResolver;
import com.marketplace.backend.service.utils.queryes.ProductQueryResolverImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Map;
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
        Catalog catalog = catalogDao.findEntityByAlias(dto.getCatalogAlias());
        Product product = productConverters.requestSaveProductDtoToProduct(dto,catalog);
        productRepository.save(product);
        return  product;
    }


    @Override
    public Paging<ResponseProductDto> findProductsInCatalog(ProductQueryParam queryParam) {

        TypedQuery<Attribute> attributeQuery = entityManager.createQuery("SELECT a from Attribute as a where a.alias in (:list)",Attribute.class);
        attributeQuery.setParameter("list",queryParam.getAttributesAlias());
        List<Attribute> res1 = attributeQuery.getResultList();
        queryParam.setAttributes(res1);
        ProductQueryResolver resolver = new ProductQueryResolverImpl(queryParam);
        /*Получаем количество выбираемых результатов*/
        resolver.init();
        TypedQuery<Long> productQueryCount = entityManager
                .createQuery(resolver.getCountWithFilters(),Long.class);
        TypedQuery<Product> productQueryResult = entityManager
                .createQuery(resolver.getSelectWithFilters(), Product.class);
        for (Map.Entry<String, Object> entry : resolver.getQueryParameters().entrySet()) {
            productQueryCount.setParameter(entry.getKey(), entry.getValue());
            productQueryResult.setParameter(entry.getKey(), entry.getValue());
        }
        Integer count  = Math.toIntExact(productQueryCount.getSingleResult());
        /*Выбираем результаты*/
        Paging<ResponseProductDto> result =
                new Paging<>(count,queryParam.getPageSize(), queryParam.getCurrentPage());
        productQueryResult.setFirstResult((result.getCurrentPage()-1)* result.getPageSize() );
        productQueryResult.setMaxResults(queryParam.getPageSize());
        result.setContent(productQueryResult
                .getResultList().stream().map(x->productConverters
                        .convertProductToResponseProductDto(x, queryParam.getCatalogAlias())).collect(Collectors.toList()));
       /* TypedQuery<Product> query = entityManager
                .createQuery("SELECT p from Product as p left join p.doubleValues as dv where (dv.attribute.id=5 and dv.value between 40 and 70)", Product.class);*/
        return result;
    }

    @Override
    public Product findProductByAlias(String alias) {
       return productRepository.findProductByAlias(alias).orElseThrow();
    }






}
