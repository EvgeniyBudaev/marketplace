package com.marketplace.backend.dao;

import com.marketplace.backend.dto.attributes.request.RequestSaveOrUpdateAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Paging;

public interface AttributeDao extends GeneralDao<Attribute> {
    Paging<ResponseAttributeForGetAll> showAllAttribute(Integer page, Integer pageSize);
    Attribute attributeByAlias(String alias);

    Attribute saveOrUpdateAttribute(RequestSaveOrUpdateAttribute attribute);


}
