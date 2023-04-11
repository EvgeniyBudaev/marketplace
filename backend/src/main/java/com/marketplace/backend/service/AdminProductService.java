package com.marketplace.backend.service;


import com.marketplace.backend.dao.ManageProductDao;
import com.marketplace.backend.dto.product.request.NumericValue;
import com.marketplace.backend.dto.product.request.RequestSaveOrUpdate;
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.ProductMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdminProductService implements ManageProductDao {
    @PersistenceContext
    private final EntityManager entityManager;
    private final CatalogService catalogService;
    private final AttributeService attributeService;
    private final ProductMapper productMapper;

    @Autowired
    public AdminProductService(EntityManager entityManager, CatalogService catalogService, AttributeService attributeService, ProductMapper productMapper) {

        this.entityManager = entityManager;
        this.catalogService = catalogService;
        this.attributeService = attributeService;
        this.productMapper = productMapper;
    }


    @Transactional
    public Integer delete(String alias) {
        Query query = entityManager
                .createQuery("UPDATE Product as p set p.enabled=false where p.alias=:alias and p.enabled=true ");
        query.setParameter("alias", alias);
        return query.executeUpdate();
    }


    @Override
    @Transactional(rollbackOn = {ResourceNotFoundException.class,OperationNotAllowedException.class})
    public Product save(RequestSaveOrUpdate dto){
        checkDto(dto);
        Product newProduct = productMapper.dtoToEntity(dto);
        newProduct.setDoubleValues(new HashSet<>());
        newProduct.setSelectableValues(new HashSet<>());
        newProduct.setEnabled(true);
        newProduct.setCatalog(catalogService.simpleCatalogByAlias(dto.getCatalogAlias()));
        entityManager.persist(newProduct);
        Set<SelectableValue> selAttribute = dto.getSelectableValues().stream().map(x->entityManager.getReference(SelectableValue.class,x)).collect(Collectors.toSet());
        selAttribute.forEach(newProduct::addSelValue);
        List<String> numericValueAttributeAlias = dto.getNumericValues().stream().map(NumericValue::getAttributeAlias).toList();
        Set<Attribute> numericAttributes = attributeService.getListAttributeByAliases(numericValueAttributeAlias);
        newProduct.setDoubleValues(new HashSet<>());
        for(NumericValue value : dto.getNumericValues()){
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
    @Override
    @Transactional(rollbackOn = {ResourceNotFoundException.class,OperationNotAllowedException.class})
    public Product update(RequestSaveOrUpdate dto){
        checkDto(dto);
        Product product = productMapper.dtoToEntity(dto);
        product.setEnabled(true);
        product.setCatalog(catalogService.simpleCatalogByAlias(dto.getCatalogAlias()));
        product.setModifyDate(LocalDateTime.now());
        product.setSelectableValues(new HashSet<>());
        product.setDoubleValues(new HashSet<>());
        Query queryDelNumericValue = entityManager.createNativeQuery("DELETE FROM double_value where product_id =:id");
        queryDelNumericValue.setParameter("id",dto.getId());
        queryDelNumericValue.executeUpdate();
        Query queryDelSelValue = entityManager.createNativeQuery("DELETE FROM products_selectable where product_id=:id");
        queryDelSelValue.setParameter("id",dto.getId());
        queryDelSelValue.executeUpdate();
        Set<Long> selValueIds = dto.getSelectableValues();
        for(Long id:selValueIds){
            SelectableValue selectableValue = entityManager.getReference(SelectableValue.class,id);
            if(selectableValue==null){
                throw new ResourceNotFoundException("Не найдено значение с id "+id);
            }
            product.addSelValue(selectableValue);
        }
        List<String> numericValueAlias = dto.getNumericValues().stream().map(NumericValue::getAttributeAlias).toList();
        Set<Attribute> attributes = attributeService.getListAttributeByAliases(numericValueAlias);
        dto.getNumericValues().forEach(x->{
           Attribute attribute = attributes.stream().filter(y->y.getAlias().equals(x.getAttributeAlias())).
                   findFirst().orElseThrow(()->new ResourceNotFoundException("Не найден атрибут с псевдонимом "+x.getAttributeAlias()));
           DoubleValue doubleValue = new DoubleValue();
           doubleValue.setProduct(product);
           doubleValue.setAttribute(attribute);
           doubleValue.setValue(x.getValue());
           product.getDoubleValues().add(doubleValue);
           entityManager.persist(doubleValue);
        });
        Product finalProduct = entityManager.merge(product);
        finalProduct.setCreatedAt(getCreatedAt(finalProduct));
        return finalProduct;
    }
    public LocalDateTime getCreatedAt(Product product){
     TypedQuery<LocalDateTime> query= entityManager.createQuery("SELECT p.createdAt FROM Product as p where p=:p", LocalDateTime.class);
     query.setParameter("p",product);
     return query.getSingleResult();
    }
    private void checkDto(RequestSaveOrUpdate dto){
        /*атрибуты которые должны быть заполнены*/
        Set<Attribute> neededAttributes = catalogService.attributesInCatalogByAlias(dto.getCatalogAlias());
        Set<Attribute> attributeInDto = new HashSet<>();
        if(!dto.getSelectableValues().isEmpty()){
            attributeInDto.addAll(attributeService.attributesAliasBySelValueIds(dto.getSelectableValues().stream().toList()));
        }
        if(!dto.getNumericValues().isEmpty()){
            attributeInDto.addAll(attributeService.getListAttributeByAliases(dto.getNumericValues().stream().map(NumericValue::getAttributeAlias).collect(Collectors.toList())));
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
    }
}
