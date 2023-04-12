package com.marketplace.backend.dao;

import com.marketplace.backend.dto.attributes.request.RequestSaveAttributeDto;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.service.utils.queryes.QueryParam;

public interface AttributeDao {
    Paging<ResponseAttributeForGetAll> findAll(QueryParam param);

    Attribute getAttributeByIdWitSelectableValues(String alias);

    Attribute saveAttribute(RequestSaveAttributeDto attribute);


}
