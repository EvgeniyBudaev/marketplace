package com.marketplace.backend.service;

import com.marketplace.backend.model.EFileType;
import com.marketplace.backend.model.EImageStatus;
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
public class AdminFilesService {
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public AdminFilesService(EntityManager entityManager) {
        this.entityManager = entityManager;
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

    public Boolean deleteFileFromFileSystem(Path path){
        try {
           return Files.deleteIfExists(path);
        }catch (IOException e){
            log.error("Не удалось удалить файл "+path);
            log.error(Arrays.toString(e.getStackTrace()));
        }
        return false;
    }
    @Transactional
    public ProductFile saveEntity(Product product, String url, EFileType type, EImageStatus status) {
        TypedQuery<ProductFile> query = entityManager
                .createQuery("SELECT file FROM ProductFile as file where file.url=:url", ProductFile.class);
        query.setParameter("url", url);
        List<ProductFile> productFiles = query.getResultList();
        if (!productFiles.isEmpty()) {
            return productFiles.get(0);
        }
        ProductFile productFile = new ProductFile();
        productFile.setImageStatus(status);
        productFile.setFileType(type);
        productFile.setProduct(product);
        productFile.setUrl(url);
        entityManager.persist(productFile);
        return productFile;
    }

    public List<ProductFile> getImageFilesByProduct(Product product){
        TypedQuery<ProductFile> query = entityManager.createQuery("SELECT p FROM ProductFile as p where p.product=:product and p.fileType=:type", ProductFile.class);
        query.setParameter("product",product);
        query.setParameter("type",EFileType.IMAGE);
        return query.getResultList();
    }


}
