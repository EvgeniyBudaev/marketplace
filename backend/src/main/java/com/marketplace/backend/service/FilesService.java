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
    private final EntityManager entityManager;

    @Autowired
    public FilesService(ProductService productService, EntityManager entityManager) {
        this.productService = productService;
        this.entityManager = entityManager;
    }

    public Product getProductByAlias(String alias){
        return productService.findSimpleProductByAlias(alias);
    }

    public Boolean saveFileOnFileSystem( MultipartFile file, Path path) {
        try {
            Files.write(path,file.getBytes());
            return true;
        } catch (IOException e) {
            log.error("Не удалось сохранить файл");
            log.error(Arrays.toString(e.getStackTrace()));
            return false;
        }
    }

    @Transactional
    public ProductFile saveEntity(Product product, String url, EFileType type) {
        ProductFile productFile = new ProductFile();
        productFile.setFileType(type);
        productFile.setProduct(product);
        productFile.setUrl(url);
        entityManager.persist(productFile);
        return productFile;
    }

    public List<ProductFile> getAllImageEntities(String productAlias){
        TypedQuery<ProductFile> query = entityManager
                .createQuery("SELECT files FROM ProductFile as files inner join Product as p on files.product =p where p.alias=:alias and files.fileType=:type",ProductFile.class);
        query.setParameter("alias",productAlias);
        query.setParameter("type",EFileType.IMAGE);
        return query.getResultList();
    }

}
