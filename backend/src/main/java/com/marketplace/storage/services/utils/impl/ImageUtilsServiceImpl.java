package com.marketplace.storage.services.utils.impl;

import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.model.Product;
import com.marketplace.properties.model.properties.GlobalProperty;
import com.marketplace.storage.models.EFileType;
import com.marketplace.storage.models.ProductFile;
import com.marketplace.storage.services.utils.FileUtils;
import com.marketplace.storage.services.utils.ImageUtilsService;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@Service
public class ImageUtilsServiceImpl implements ImageUtilsService {

    private final GlobalProperty globalProperty;
    private final FileUtils fileUtils;
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public ImageUtilsServiceImpl(GlobalProperty globalProperty, FileUtils fileUtils, EntityManager entityManager) {
        this.globalProperty = globalProperty;
        this.fileUtils = fileUtils;
        this.entityManager = entityManager;
    }

    @Transactional
    @Override
    public ProductFile saveImageFile(MultipartFile uploadFile, Product product) {
        if (Boolean.TRUE.equals(globalProperty.getIsProductImageDirectoryAvailability())) {
            if (Boolean.TRUE.equals(checkImageFile(uploadFile))) {
                Path imageDir = Path.of(globalProperty.getPRODUCT_IMAGE_DIR().toString(), product.getId().toString());
                if (!fileUtils.createIfNotExistProductDir(imageDir)) {
                    throw new OperationNotAllowedException("Не удалось создать директорию продукта");
                }
                Path filePath = Path.of(imageDir.toString(), uploadFile.getOriginalFilename());
                fileUtils.saveFileOnFileSystem(uploadFile, filePath);
                return saveFileDescription(product, uploadFile.getOriginalFilename(), EFileType.IMAGE);
            } else {
                throw new OperationNotAllowedException("Файл не является изображением: " +uploadFile.getOriginalFilename());
            }
        }
        throw new OperationNotAllowedException("Директория для сохранения файла не доступна");
    }

    private Boolean checkImageFile(MultipartFile file) {
        Tika tika = new Tika();
        try {
            String mimeType =  tika.detect(file.getInputStream());
            String[] type = mimeType.split("/");
            return type[0].equals("image");
        }catch (IOException e){
            return false;
        }

    }


    public ProductFile saveFileDescription(Product product, String url, EFileType type) {
        TypedQuery<ProductFile> query = entityManager
                .createQuery("SELECT file FROM ProductFile as file where file.url=:url and file.product =:product", ProductFile.class);
        query.setParameter("url", url);
        query.setParameter("product",product);
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
