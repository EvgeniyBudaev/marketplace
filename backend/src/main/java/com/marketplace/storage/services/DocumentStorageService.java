package com.marketplace.storage.services;

import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import com.marketplace.storage.models.EFileType;
import com.marketplace.storage.models.ProductFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public interface DocumentStorageService {
    ProductFile saveFile(MultipartFile uploadFile, EFileType eFileType, Product product);
    String saveFile(MultipartFile uploadFile, EFileType eFileType, Catalog catalog);
    String getDefaultImageUrl(Product product);
    String getDefaultImageUrl(Catalog catalog);
    Map<Long,String> getDefaultImageUrl(List<Long> productIds);
    Map<Long,List<String>> getImagesUrl(List<Long> productIds);
    List<String> getImageUrls(Product product);
    Set<ProductFile> updateProductFileInProduct(List<String> oldImageUrls,String defaultImageUrl, Product product);

}
