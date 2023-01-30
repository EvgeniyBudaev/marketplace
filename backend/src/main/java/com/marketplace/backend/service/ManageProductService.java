package com.marketplace.backend.service;

import com.marketplace.backend.dao.ManageProductDao;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.ProductMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.repository.ProductRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ManageProductService implements ManageProductDao {
    private final ProductRepository productRepository;
    @PersistenceContext
    private final EntityManager entityManager;
    private final CatalogService catalogService;
    private final AttributeService attributeService;
    private final AttributeValueService attributeValueService;
    private final ProductMapper productMapper;

    @Autowired
    public ManageProductService(ProductRepository productRepository, EntityManager entityManager, CatalogService catalogService, AttributeService attributeService, AttributeValueService attributeValueService) {
        this.productRepository = productRepository;
        this.entityManager = entityManager;
        this.catalogService = catalogService;
        this.attributeService = attributeService;
        this.attributeValueService = attributeValueService;
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
    @Transactional(rollbackOn = {ResourceNotFoundException.class,OperationNotAllowedException.class})
    public Product save(RequestSaveProductDto dto) {

        /*атрибуты которые должны быть заполнены*/
        Set<Attribute> neededAttributes = catalogService.attributesInCatalogByAlias(dto.getCatalogAlias());
        Set<Attribute> attributeInDto = new HashSet<>();
        if(!dto.getSelectableValues().isEmpty()){
            attributeInDto.addAll(attributeService.attributesAliasBySelValueIds(dto.getSelectableValues().stream().toList()));
        }
        if(!dto.getNumericValues().isEmpty()){
            attributeInDto.addAll(attributeService.getListAttributeByAliases(dto.getNumericValues().stream().map(RequestSaveProductDto.NumericValue::getAttributeAlias).collect(Collectors.toList())));
        }
        /*Проверяем все ли требуемые атрибуты присутствуют в dto*/
       if(!attributeInDto.containsAll(neededAttributes)||!neededAttributes.containsAll(attributeInDto)){
           StringBuilder sb = new StringBuilder();
            neededAttributes.stream().filter(x-> !attributeInDto.contains(x)).forEach(x-> sb.append(x.getName()).append(","));
            StringBuilder sb2 = new StringBuilder();
            attributeInDto.stream().filter(x->!neededAttributes.contains(x)).forEach(x->sb2.append(x.getName()).append(","));
            String message = null;
            if(!sb.isEmpty()&&!sb2.isEmpty()){
                message = "В запросе осутствуют значения следующих атрибутов: "+sb+ " а так же присутствуют лишние: "+sb2;
            }
            if(sb.isEmpty()&&!sb2.isEmpty()){
               message = "В запросе присутствуют значения лишних атрибутов: "+sb2;
            }
           if(!sb.isEmpty()&&sb2.isEmpty()){
               message = "В запросе осутствуют значения следующих атрибутов: "+sb;
           }
           /*удаляем последнюю запятую*/
            if(message!=null){
                message = message.substring(0,message.length()-1);
            }
            throw new OperationNotAllowedException(message);
       }
       if (dto.getId()==null){
           return saveNewProduct(dto);
       }
       return updateProduct(dto);
    }
    public Product saveNewProduct(RequestSaveProductDto dto){
        Product newProduct = productMapper.dtoToEntity(dto);
        newProduct.setCatalog(catalogService.simpleCatalogByAlias(dto.getCatalogAlias()));
        entityManager.persist(newProduct);
        Set<SelectableValue> selAttribute = dto.getSelectableValues().stream().map(x->entityManager.getReference(SelectableValue.class,x)).collect(Collectors.toSet());
        selAttribute.forEach(newProduct::addSelValue);
        List<String> numericValueAttributeAlias = dto.getNumericValues().stream().map(RequestSaveProductDto.NumericValue::getAttributeAlias).toList();
        Set<Attribute> numericAttributes = attributeService.getListAttributeByAliases(numericValueAttributeAlias);
        newProduct.setDoubleValues(new HashSet<>());
        for(RequestSaveProductDto.NumericValue value : dto.getNumericValues()){
            DoubleValue doubleValue = new DoubleValue();
            doubleValue.setProduct(newProduct);
            newProduct.getDoubleValues().add(doubleValue);
            doubleValue.setValue(value.getValue());
            doubleValue.setAttribute(numericAttributes.stream().filter(x->x.getAlias()
                    .equals(value.getAttributeAlias())).findFirst().orElseThrow(()->new ResourceNotFoundException("Не найден атрибут с псевдонимом: "+value.getAttributeAlias())));
            entityManager.persist(doubleValue);
        }
        return newProduct;
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
        return product;
    }
}
