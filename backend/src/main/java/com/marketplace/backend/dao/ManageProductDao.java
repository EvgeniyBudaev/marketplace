package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.request.RequestSaveOrUpdate;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.Product;
import com.marketplace.storage.models.ProductFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;


public interface ManageProductDao {
    ResponseProductDto save(RequestSaveOrUpdate dto, MultipartFile defaultImage, MultipartFile[] files);
    Product update(RequestSaveOrUpdate dto);
    Integer delete(String alias);
    void setDefaultFile(Set<ProductFile> images, String filename);
}
