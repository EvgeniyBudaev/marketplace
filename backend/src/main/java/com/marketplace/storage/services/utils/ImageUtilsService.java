package com.marketplace.storage.services.utils;


import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import com.marketplace.storage.models.ProductFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public interface ImageUtilsService {

    ProductFile saveImageFile(MultipartFile uploadFile, Product product);
    String saveImageFile(MultipartFile uploadFile, Catalog catalog);
}
