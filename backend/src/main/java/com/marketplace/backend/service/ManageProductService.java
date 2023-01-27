package com.marketplace.backend.service;

import com.marketplace.backend.dao.ManageProductDao;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.ProductMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.repository.ProductRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ManageProductService implements ManageProductDao {
    private final ProductRepository productRepository;
    @PersistenceContext
    private final EntityManager entityManager;
    private final CatalogService catalogService;
    private final AttributeService attributeService;
    private final ProductMapper productMapper;

    @Autowired
    public ManageProductService(ProductRepository productRepository, EntityManager entityManager, CatalogService catalogService, AttributeService attributeService) {
        this.productRepository = productRepository;
        this.entityManager = entityManager;
        this.catalogService = catalogService;
        this.attributeService = attributeService;
        this.productMapper = Mappers.getMapper(ProductMapper.class);
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
    @Transactional(rollbackOn = {ResourceNotFoundException.class})
    public Product save(RequestSaveProductDto dto) {
        Product newProduct = productMapper.dtoToEntity(dto);
        /*атрибуты которые должны быть заполнены*/
        Set<Attribute> neededAttributes = catalogService.attributesInCatalogByAlias(dto.getAlias());
        Set<Attribute> attributeAliasInDto = new HashSet<>();
        if(!dto.getSelectableValues().isEmpty()){
            attributeAliasInDto.addAll(attributeService.attributesAliasBySelValueIds(dto.getSelectableValues().stream().toList());)
        }

        Set<Attribute>
    }
    public Product saveNewProduct(Product product){

    }
    public Product updateProduct(RequestSaveProductDto dto){
        Query query = entityManager
                .createQuery("UPDATE Product as p set p.alias =:alias, p.name=:name, p.description=:desc, p.alias = :alias, p.enabled=true," +
                        "p.count=:count, p.price=:price where p.id=:id");
        query.setParameter("name", dto.getName());
        query.setParameter("desc", dto.getDescription());
        query.setParameter("alias", dto.getAlias());
        query.setParameter("count", dto.getCount());
        query.setParameter("alias", dto.getAlias());
        query.setParameter("id",dto.getId());
        query.executeUpdate();
        Product product = entityManager.find(Product.class,dto.getId());
    }
}
