package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.ProductConverters;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.exception.ResourceNotFoundException;
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

import javax.persistence.EntityGraph;
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
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("product-with-all-fields");
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
        if(count.equals(0)){
            throw new ResourceNotFoundException("С данными параметрами результаты не найдены");
        }
        /*Выбираем результаты*/
        Paging<ResponseProductDto> result =
                new Paging<>(count,queryParam.getPageSize(), queryParam.getCurrentPage());
        productQueryResult.setFirstResult((result.getCurrentPage()-1)* result.getPageSize() );
        productQueryResult.setMaxResults(queryParam.getPageSize());
        productQueryResult.setHint("javax.persistence.fetchgraph", entityGraph);
        result.setContent(productQueryResult
                .getResultList().stream().map(x->productConverters
                        .convertProductToResponseProductDto(x, queryParam.getCatalogAlias())).collect(Collectors.toList()));
        return result;
    }

    @Override
    public ResponseProductDto findProductByAlias(String alias) {
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("product-with-all-fields");
        TypedQuery<Product> query = entityManager
                .createQuery("SELECT p from Product as p where p.alias=:alias and p.enabled=true", Product.class);
        query.setParameter("alias",alias);
        query.setHint("javax.persistence.fetchgraph", entityGraph);
        Product product = query.getSingleResult();
        if (product==null){
            throw new ResourceNotFoundException("Не найден продукт с псевдонимом "+alias);
        }
        return productConverters.convertProductToResponseProductDto(product,product.getCatalog().getAlias());
    }

    @Override
    public Paging<ResponseProductDto> findProductLikeName(Integer page, Integer pageSize, String find){
        find = "%"+find+"%";
        TypedQuery<Long> countQuery = entityManager
                .createQuery("SELECT count (p) from Product as p where p.name like :find and p.enabled=true", Long.class);
        countQuery.setParameter("find",find);
        Integer count  = Math.toIntExact(countQuery.getSingleResult());
        if(count.equals(0)){
            throw new ResourceNotFoundException("С данными параметрами результаты не найдены");
        }
        Paging<ResponseProductDto> dtoPaging= new Paging<>(count,pageSize,page);
        /*Ввиду того что при fetch запросе hibernate сначала выберает весь результат запроса в память а потом в памяти устанавливает границы setFirstResult() setMaxResult()
        * сначала выбираем с ограничениями id продуктов а вторым запросом пожтягиваем зависимые сущности*/
        TypedQuery<Long> productIdQuery = entityManager.createQuery("SELECT p.id from Product as p where p.name like :find and p.enabled=true", Long.class);
        productIdQuery.setParameter("find",find);
        productIdQuery.setFirstResult((dtoPaging.getCurrentPage()-1)* dtoPaging.getPageSize());
        productIdQuery.setMaxResults(dtoPaging.getPageSize());
        productIdQuery.setFirstResult((dtoPaging.getCurrentPage()-1)* dtoPaging.getPageSize() );
        productIdQuery.setMaxResults(dtoPaging.getPageSize());
        List<Long> productId = productIdQuery.getResultList();
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("product-with-all-fields");
        TypedQuery<Product> resultQuery = entityManager
                .createQuery("SELECT p from Product as p where p.id IN (:idList)", Product.class);
        resultQuery.setParameter("idList",productId);
        resultQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        dtoPaging.setContent(resultQuery
                .getResultList().stream()
                .map(x->productConverters
                        .convertProductToResponseProductDto(x,x.getCatalog().getAlias()))
                .collect(Collectors.toList()));
        return dtoPaging;
    }





}
