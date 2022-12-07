package com.marketplace.backend.service;

import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.dto.attributes.AttributeConverter;
import com.marketplace.backend.dto.attributes.request.RequestSaveNonSelectableAttribute;
import com.marketplace.backend.dto.attributes.request.RequestSaveSelectableAttribute;
import com.marketplace.backend.dto.attributes.response.*;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.repository.AttributeRepository;
import com.marketplace.backend.repository.values.SelectableValueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AttributeService implements AttributeDao {
    private final AttributeRepository attributeRepository;
    private final SelectableValueRepository selectableValueRepository;
    private final EntityManager entityManager;
    private final AttributeConverter attributeConverter;

    public AttributeService(AttributeRepository attributeRepository,
                            SelectableValueRepository selectableValueRepository,
                            EntityManager entityManager) {
        this.attributeRepository = attributeRepository;
        this.selectableValueRepository = selectableValueRepository;
        this.entityManager = entityManager;
        this.attributeConverter = new AttributeConverter();
    }


    @Override
    @Transactional
    public Paging<ResponseAttributeForGetAll> showAllAttribute(Integer page,Integer pageSize){
        TypedQuery<Long> query = entityManager.createQuery("SELECT count (a) from Attribute a where a.enabled=true",Long.class);
        Integer count =  Math.toIntExact(query.getSingleResult());
        Paging<ResponseAttributeForGetAll> result = new Paging<>(count,pageSize,page);
        TypedQuery<Attribute> resultQuery = entityManager.createQuery("SELECT a from Attribute a where a.enabled=true", Attribute.class);
        resultQuery.setFirstResult((page-1)*pageSize );
        resultQuery.setMaxResults(pageSize);
        result.setContent(resultQuery.getResultList().stream().map(ResponseAttributeForGetAll::new).collect(Collectors.toList()));
        return result;
    }

    /*Выдаем аттрибут только если enabled=true*/
    @Override
    @Transactional
    public ResponseSingleAttributeByAlias attributeByAlias(String alias){
        Attribute attribute = attributeRepository.findAttributeByAliasAndEnabledIsTrue(alias).orElseThrow();
        if(attribute.getType().equals(EAttributeType.SELECTABLE)){
            return  new ResponseSingleAttributeByAlias(attribute,attribute.getSingleSelectableValue());
        }
        return new ResponseSingleAttributeByAlias(attribute);
    }

    @Override
    @Transactional
    public ResponseSelectableAttributeAfterSave saveSelectable(RequestSaveSelectableAttribute dto) {
        Attribute attribute = this.attributeConverter.baseAttributeToEntity(dto);
        List<SelectableValue> selectableValues = new ArrayList<>();
        for(RequestSaveSelectableAttribute.SelectableValueDto valueDto: dto.getSelectable()){
            SelectableValue selectableValue = new SelectableValue();
            selectableValue.setId(valueDto.getId());
            selectableValue.setAttribute(attribute);
            selectableValue.setValue(valueDto.getValue());
            selectableValues.add(selectableValue);
        }
        attribute.setSingleSelectableValue(selectableValues);
        this.save(attribute);
        ResponseSelectableAttributeAfterSave result = new ResponseSelectableAttributeAfterSave(attribute);
        result.setSelectable(selectableValues.stream()
                .map(SelectableValueDto::new).collect(Collectors.toList()));
        return result;
    }

    @Override
    public ResponseNonSelectableAttributeAfterSave saveNonSelectable(RequestSaveNonSelectableAttribute dto) {
       Attribute attribute = this.attributeConverter.baseAttributeToEntity(dto);
       this.save(attribute);
       return new ResponseNonSelectableAttributeAfterSave(attribute);
    }

    @Override
    public void save(Attribute obj) {
        attributeRepository.save(obj);
    }



    @Override
    public void delete(String alias) {
       return;
    }
}
