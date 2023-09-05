package com.marketplace.storage.services.utils;

import com.marketplace.backend.model.Product;
import com.marketplace.storage.models.ProductFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public interface DocumentUtilsService {
    ProductFile saveDocumentFile(MultipartFile uploadFile, Product product);
}
