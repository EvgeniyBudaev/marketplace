package com.marketplace.backend.service;

import com.marketplace.backend.model.EFileType;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.ProductFile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class FilesService {
    private final ProductService productService;
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public FilesService(ProductService productService, EntityManager entityManager) {
        this.productService = productService;
        this.entityManager = entityManager;
    }

    public Product getProductByAlias(String alias) {
        return productService.findProductWithCatalogByAlias(alias);
    }

    public Boolean saveFileOnFileSystem(MultipartFile file, Path path) {
        try {
            Files.write(path, file.getBytes());
            return true;
        } catch (IOException e) {
            log.error("Не удалось сохранить файл");
            log.error(Arrays.toString(e.getStackTrace()));
            return false;
        }
    }

    @Transactional
    public ProductFile saveEntity(Product product, String url, EFileType type) {
        TypedQuery<ProductFile> query = entityManager
                .createQuery("SELECT file FROM ProductFile as file where file.url=:url", ProductFile.class);
        query.setParameter("url", url);
        List<ProductFile> productFiles = query.getResultList();
        if (!productFiles.isEmpty()) {
            return productFiles.get(0);
        }
        ProductFile productFile = new ProductFile();
        productFile.setFileType(type);
        productFile.setProduct(product);
        productFile.setUrl(url);
        entityManager.persist(productFile);
        return productFile;
    }

}
