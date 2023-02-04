package com.marketplace.backend.dao;

import com.marketplace.backend.dto.attributes.request.RequestSaveOrUpdateAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Paging;

public interface AttributeDao {
    Paging<ResponseAttributeForGetAll> findAll(Integer page, Integer pageSize);
    Attribute getAttributeByAlias(String alias);

    Attribute saveOrUpdateAttribute(RequestSaveOrUpdateAttribute attribute);


}
