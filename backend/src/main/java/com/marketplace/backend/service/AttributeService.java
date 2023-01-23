package com.marketplace.backend.service;

import com.marketplace.backend.dao.AttributeDao;
import com.marketplace.backend.dto.attributes.request.RequestSaveOrUpdateAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.dto.attributes.response.ResponseSingleAttribute;
import com.marketplace.backend.dto.attributes.response.SelectableValueDto;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.AttributeMapper;
import com.marketplace.backend.mappers.SelectableValueMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.repository.AttributeRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AttributeService implements AttributeDao {
    private final AttributeRepository attributeRepository;
    @PersistenceContext
    private final EntityManager entityManager;

    private final AttributeMapper attributeMapper;
    private final SelectableValueMapper selectableValueMapper;


    @Autowired
    public AttributeService(AttributeRepository attributeRepository,
                            EntityManager entityManager) {
        this.attributeRepository = attributeRepository;
        this.entityManager = entityManager;
        this.attributeMapper = Mappers.getMapper(AttributeMapper.class);
        this.selectableValueMapper = Mappers.getMapper(SelectableValueMapper.class);
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
        List<ResponseAttributeForGetAll> dtoList = attributeMapper.entitiesToListDto(resultQuery.getResultList());
        result.setContent(dtoList);
        return result;
    }

    /*Выдаем аттрибут только если enabled=true*/
    @Override
    @Transactional
    public Attribute attributeByAlias(String alias){
        return attributeRepository.
                findAttributeByAliasAndEnabledIsTrue(alias).
                orElseThrow(()->new ResourceNotFoundException("Атрибут с псевдонимом "+alias+" не найден"));
    }

    /*Сохранение или апдейт ориентируемся на поле id если id null то это новый
    * */
    @Override
    @Transactional
    public Attribute saveOrUpdateAttribute(RequestSaveOrUpdateAttribute dto) {

        Attribute attribute = attributeMapper.dtoToEntity(dto);
        if(attribute.getFilter()==null){
            attribute.setFilter(true);
        }
        if(attribute.getEnabled()==null){
            attribute.setEnabled(true);
        }
        if(dto.getSelectable()!=null){
            List<SelectableValue> values =
                    selectableValueMapper.dtoListToEntityList(dto.getSelectable());
            values.forEach(x->x.setAttribute(attribute));
            attribute.setSingleSelectableValue(values);
        }
        if(attribute.getId()==null){
            return saveNewEntity(attribute);
        }
        return updateEntity(attribute);
    }
    @Transactional
    public Attribute saveNewEntity(Attribute attribute){
        entityManager.persist(attribute);
        return attribute;
    }

    @Transactional
    public Attribute updateEntity(Attribute attribute){
      Attribute newAttribute = entityManager.merge(attribute);

      return newAttribute;
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
