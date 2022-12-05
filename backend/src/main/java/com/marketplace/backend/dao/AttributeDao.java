package com.marketplace.backend.dao;

import com.marketplace.backend.dto.attributes.request.RequestSaveNonSelectableAttribute;
import com.marketplace.backend.dto.attributes.request.RequestSaveSelectableAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.dto.attributes.response.ResponseNonSelectableAttributeAfterSave;
import com.marketplace.backend.dto.attributes.response.ResponseSelectableAttributeAfterSave;
import com.marketplace.backend.dto.attributes.response.ResponseSingleAttributeByAlias;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Paging;

public interface AttributeDao extends GeneralDao<Attribute> {
    Paging<ResponseAttributeForGetAll> showAllAttribute(Integer page, Integer pageSize);
    ResponseSingleAttributeByAlias attributeByAlias(String alias);

    ResponseSelectableAttributeAfterSave saveSelectable(RequestSaveSelectableAttribute attribute);

    ResponseNonSelectableAttributeAfterSave saveNonSelectable(RequestSaveNonSelectableAttribute attribute);
}
