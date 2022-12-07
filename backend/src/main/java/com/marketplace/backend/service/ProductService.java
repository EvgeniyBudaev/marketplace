package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.ProductConverters;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.*;
import com.marketplace.backend.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
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
    public Paging<ResponseProductDto> findProductsInCatalog(String catalogAlias, Integer page, Integer pageSize, MultiValueMap<String, String> filters) {
        Set<String> attributesAlias = filters.keySet();
        TypedQuery<Attribute> attributeQuery = entityManager.createQuery("SELECT a from Attribute as a where a.alias in (:list)",Attribute.class);
        attributeQuery.setParameter("list",attributesAlias);
        List<Attribute>  attributes = attributeQuery.getResultList();
        /*Разбераем наши аттрибуты по типам значений в них*/
        List<Attribute> selectedValue = attributes.stream()
                .filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).toList();
        List<Attribute> doubleValue = attributes.stream()
                .filter(x -> x.getType().equals(EAttributeType.DOUBLE)).toList();
        List<Attribute> booleanValue = attributes.stream()
                .filter(x -> x.getType().equals(EAttributeType.BOOLEAN)).toList();
        /*Выбираем id всех SelectableValue*/
        List<Long> selectableValuesId = new ArrayList<>();
        selectedValue.forEach(attribute -> {
            List<String> attrIds = filters.get(attribute.getAlias());
            attrIds.forEach(s -> selectableValuesId.addAll(Arrays.stream(s.split(",")).map(Long::parseLong).toList()));
        });
        /*Получаем количество выбираемых результатов*/
        String query;
        if(!selectableValuesId.isEmpty()){
            query= " from Product as p join p.selectableValues sv where sv.id in (:listId) and p.catalog.alias=:alias and p.enabled=true";
        }else {
            query = "from Product as p where p.catalog.alias=:alias and p.enabled=true";
        }
        TypedQuery<Long> productCountQuery = entityManager
                .createQuery("SELECT count (p) "+query, Long.class);
        if(!selectableValuesId.isEmpty()){
            System.out.println(selectableValuesId);
            productCountQuery.setParameter("listId",selectableValuesId);
        }
        productCountQuery.setParameter("alias",catalogAlias);
        Integer count  = Math.toIntExact(productCountQuery.getSingleResult());
        /*Выбираем результаты*/
        TypedQuery<Product> productQueryResult = entityManager
                .createQuery("SELECT p "+query, Product.class);
        if(!selectableValuesId.isEmpty()){
            System.out.println(selectableValuesId);
            productQueryResult.setParameter("listId",selectableValuesId);
        }
        productQueryResult.setParameter("alias",catalogAlias);
        Paging<ResponseProductDto> result = new Paging<>(count,pageSize,page);
        productQueryResult.setFirstResult((result.getCurrentPage()-1)* result.getPageSize() );
        productQueryResult.setMaxResults(pageSize);
        result.setContent(productQueryResult
                .getResultList().stream().map(x->productConverters
                        .convertProductToResponseProductDto(x,catalogAlias)).collect(Collectors.toList()));
        return result;
    }

    @Override
    public Product findProductByAlias(String alias) {
       return productRepository.findProductByAlias(alias).orElseThrow();
    }






}
