package com.marketplace.backend.service;

import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ProductQueryParam;
import com.marketplace.backend.service.utils.queryes.processors.QueryChainProcessor;
import com.marketplace.backend.service.utils.queryes.processors.QueryChainProcessorImpl;
import com.marketplace.backend.service.utils.queryes.processors.QueryProcessorParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@Slf4j
public class ProductService implements ProductDao {

    private final EntityManager entityManager;

    public ProductService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    @Transactional
    public Paging<ResponseProductDto> findProductsInCatalog(ProductQueryParam queryParam) {
        QueryChainProcessor chainProcessor = new QueryChainProcessorImpl();
        QueryProcessorParam param = chainProcessor.attributeQuery(queryParam);
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("product-with-all-fields");
        TypedQuery<Attribute> attributeQuery = entityManager.createQuery(param.query(), Attribute.class);
        attributeQuery.setParameter("list", param.param().get("list"));
        List<Attribute> res1 = attributeQuery.getResultList();
        queryParam.setAttributes(res1);

        /*Получаем количество выбираемых результатов*/
        QueryProcessorParam queryProcessorParamCount = chainProcessor.productCountQuery(queryParam);

        TypedQuery<Long> productQueryCount = entityManager.createQuery(queryProcessorParamCount.query(), Long.class);
        /*Ввиду того что при fetch запросе hibernate сначала выберает весь результат запроса в память а потом в памяти устанавливает границы setFirstResult() setMaxResult()
         * сначала выбираем с ограничениями id продуктов а вторым запросом пожтягиваем зависимые сущности*/
        setParamInQuery(productQueryCount,queryProcessorParamCount.param());
        Integer count = Math.toIntExact(productQueryCount.getSingleResult());
        /*Если количество результатов равно нулю тогда кидаем эксепшн*/
        if (count.equals(0)) {
            throw new ResourceNotFoundException("С данными параметрами результаты не найдены");
        }
        QueryProcessorParam queryProcessorParamList = chainProcessor.productListQuery();
        TypedQuery<Product> productQueryList = entityManager
                .createQuery(queryProcessorParamList.query(), Product.class);
        setParamInQuery(productQueryList,queryProcessorParamList.param());
                /*Подготавливаем результат запроса*/
        Paging<ResponseProductDto> result =
                new Paging<>(count, queryParam.getPageSize(), queryParam.getCurrentPage());
        productQueryList.setFirstResult((result.getCurrentPage() - 1) * result.getPageSize());
        productQueryList.setMaxResults(queryParam.getPageSize());
        List<Product> productIdList = productQueryList.getResultList();
        /*Финальная выборка продуктов*/
        QueryProcessorParam resultQueryParam = chainProcessor.resultQuery(productIdList);
        TypedQuery<Product> productTypedQuery = entityManager.createQuery(resultQueryParam.query(), Product.class);
        setParamInQuery(productTypedQuery,resultQueryParam.param());
        productTypedQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        List<Product> resultProductList = productTypedQuery.getResultList();
        result.setContent(resultProductList
                .stream().map(x -> new ResponseProductDto(x, queryParam.getCatalogAlias())).collect(Collectors.toList()));
        return result;
    }

    @Override
    @Transactional
    public Product findProductByAlias(String alias) {
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("product-with-all-fields");
        TypedQuery<Product> query = entityManager
                .createQuery("SELECT p from Product as p where p.alias=:alias and p.enabled=true", Product.class);
        query.setParameter("alias", alias);
        query.setHint("javax.persistence.fetchgraph", entityGraph);
        Product product = query.getSingleResult();
        if (product == null) {
            throw new ResourceNotFoundException("Не найден продукт с псевдонимом " + alias);
        }
        return product;
    }

    @Override
    @Transactional
    public Paging<ResponseProductDto> findProductLikeName(Integer page, Integer pageSize, String find) {
        find = "%" + find.toLowerCase() + "%";
        TypedQuery<Long> countQuery = entityManager
                .createQuery("SELECT count (p) from Product as p where p.name like lower(:find) or p.description like lower(:find) and p.enabled=true", Long.class);
        countQuery.setParameter("find", find);
        Integer count = Math.toIntExact(countQuery.getSingleResult());
        if (count.equals(0)) {
            throw new ResourceNotFoundException("С данными параметрами результаты не найдены");
        }
        Paging<ResponseProductDto> dtoPaging = new Paging<>(count, pageSize, page);
        /*Ввиду того что при fetch запросе hibernate сначала выберает весь результат запроса в память а потом в памяти устанавливает границы setFirstResult() setMaxResult()
         * сначала выбираем с ограничениями id продуктов а вторым запросом пожтягиваем зависимые сущности*/
        TypedQuery<Long> productIdQuery = entityManager.createQuery("SELECT p.id from Product as p where p.name like :find and p.enabled=true", Long.class);
        productIdQuery.setParameter("find", find);
        productIdQuery.setFirstResult((dtoPaging.getCurrentPage() - 1) * dtoPaging.getPageSize());
        productIdQuery.setMaxResults(dtoPaging.getPageSize());
        productIdQuery.setFirstResult((dtoPaging.getCurrentPage() - 1) * dtoPaging.getPageSize());
        productIdQuery.setMaxResults(dtoPaging.getPageSize());
        List<Long> productId = productIdQuery.getResultList();
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("product-with-all-fields");
        TypedQuery<Product> resultQuery = entityManager
                .createQuery("SELECT p from Product as p where p.id IN (:idList)", Product.class);
        resultQuery.setParameter("idList", productId);
        resultQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        dtoPaging.setContent(resultQuery
                .getResultList().stream()
                .map(x -> new ResponseProductDto(x, x.getCatalog().getAlias()))
                .collect(Collectors.toList()));
        return dtoPaging;
    }

    private void setParamInQuery(TypedQuery<?> query,Map<String,Object> param){
        for (Map.Entry<String, Object> entry : param.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }
    }

}
