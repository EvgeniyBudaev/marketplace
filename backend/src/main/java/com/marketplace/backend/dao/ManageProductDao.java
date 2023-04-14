package com.marketplace.backend.dao;

import com.marketplace.backend.dto.product.request.RequestSaveOrUpdate;
import com.marketplace.backend.model.EFileType;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.ProductFile;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;


public interface ManageProductDao {
    Product save(RequestSaveOrUpdate dto);

    Product update(RequestSaveOrUpdate dto);

    Integer delete(String alias);
    Boolean saveFileOnFileSystem(MultipartFile file, Path path);
    ProductFile saveFileDescription(Product product, String url, EFileType type);
}
