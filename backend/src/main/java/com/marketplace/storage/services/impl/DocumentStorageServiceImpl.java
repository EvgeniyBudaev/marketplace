package com.marketplace.storage.services.impl;

import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.EImageStatus;
import com.marketplace.backend.model.Product;
import com.marketplace.properties.model.properties.GlobalProperty;
import com.marketplace.storage.models.EFileType;
import com.marketplace.storage.models.ProductFile;
import com.marketplace.storage.services.DocumentStorageService;
import com.marketplace.storage.services.utils.FileUtils;
import com.marketplace.storage.services.utils.ImageUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.nio.file.Path;
import java.util.*;

@Service
public class DocumentStorageServiceImpl implements DocumentStorageService {

   /* private final DocumentUtilsService documentUtilsService;*/
    private final ImageUtilsService imageUtilsService;
    private final GlobalProperty globalProperty;
    private final FileUtils fileUtils;
    @PersistenceContext
    private final EntityManager entityManager;


    @Autowired
    public DocumentStorageServiceImpl( ImageUtilsService imageUtilsService, GlobalProperty globalProperty, FileUtils fileUtils, EntityManager entityManager) {
        this.imageUtilsService = imageUtilsService;
        this.globalProperty = globalProperty;
        this.fileUtils = fileUtils;
        this.entityManager = entityManager;
    }

    @Override
    public String getDefaultImageUrl(Product product) {
        ProductFile defaultImage =product.getProductFiles().stream()
                .filter(productFile -> Objects.equals(productFile.getImageStatus(),EImageStatus.DEFAULT)).findFirst().orElse(null);
        if(defaultImage==null){
            return null;
        }
        return createProductImageUrl(product,defaultImage);
    }
    @Override
    public String getDefaultImageUrl(Catalog catalog) {
        return createCatalogImageUrl(catalog);
    }

    @Override
    public Map<Long,String> getDefaultImageUrl(List<Long> productIds) {
        Map<Long,String> resultMap = new HashMap<>();
        TypedQuery<ProductFile> query = entityManager
                .createQuery("SELECT pf FROM ProductFile as pf left join fetch pf.product as p WHERE p.id in (:productIds) and pf.imageStatus=:status", ProductFile.class);
        query.setParameter("productIds",productIds);
        query.setParameter("status",EImageStatus.DEFAULT);
        query.getResultStream().forEach(productFile -> resultMap.put(productFile.getProduct().getId(), createProductImageUrl(productFile.getProduct(),productFile)));
        return resultMap;
    }

    @Override
    public Map<Long, List<String>> getImagesUrl(List<Long> productIds) {
        Map<Long,List<String>> resultMap = new HashMap<>();
        TypedQuery<ProductFile> query = entityManager
                .createQuery("SELECT pf FROM ProductFile as pf inner join fetch pf.product as p WHERE p.id in (:productIds)", ProductFile.class);
        query.setParameter("productIds",productIds);
        query.getResultStream().forEach(productFile -> {
            Long id = (productFile.getProduct().getId());
            if(!resultMap.containsKey(id)){
                List<String> productImageUrls = new LinkedList<>();
                productImageUrls.add(createProductImageUrl(productFile.getProduct(),productFile));
                resultMap.put(id,productImageUrls);
            }else {
                List<String> productImageUrls = resultMap.get(id);
                productImageUrls.add(createProductImageUrl(productFile.getProduct(),productFile));
            }
        });
        return resultMap;
    }


    @Override
    public List<String> getImageUrls(Product product) {
        List<String> resultList = new LinkedList<>();
        TypedQuery<ProductFile> query = entityManager.createQuery("SELECT pf FROM ProductFile as pf left join fetch pf.product WHERE pf.product=:product", ProductFile.class);
        query.setParameter("product",product);
        query.getResultStream().forEach(productFile -> resultList.add(createProductImageUrl(productFile.getProduct(),productFile)));
        return resultList;
    }

    @Transactional
    @Override
    public Set<ProductFile> updateProductFileInProduct(List<String> newImageUrls, String defaultImageUrl, Product product) {
        TypedQuery<ProductFile> query = entityManager
                .createQuery("SELECT pf FROM ProductFile as pf WHERE pf.product =:product",ProductFile.class);
        query.setParameter("product",product);
        List<ProductFile> oldProductFiles = query.getResultList();
        if(oldProductFiles!=null&&!oldProductFiles.isEmpty()){
            Iterator<ProductFile> iterator = oldProductFiles.iterator();
            while (iterator.hasNext()){
                ProductFile x = iterator.next();
                String url = createProductImageUrl(product,x);
                if(!newImageUrls.contains(url)){
                    Path path = Path.of(String.valueOf(globalProperty.getPRODUCT_IMAGE_DIR()),x.getUrl());
                    fileUtils.deleteFileFromFileSystem(path);
                    iterator.remove();
                }else {

                    if(x.getUrl().equals(defaultImageUrl)){
                        x.setImageStatus(EImageStatus.DEFAULT);
                    }else {
                        if(x.getImageStatus()!=null&&x.getImageStatus().equals(EImageStatus.DEFAULT)){
                            x.setImageStatus(null);
                        }
                    }
                }
            }
            return new HashSet<>(oldProductFiles);
        }
        return null;
    }


    @Nullable
    @Override
    public ProductFile saveFile(MultipartFile uploadFile, EFileType eFileType, Product product){
           if(eFileType.equals(EFileType.DOCUMENT)) {
               return null;
           }
           if (eFileType.equals(EFileType.IMAGE)){
               return this.imageUtilsService.saveImageFile(uploadFile,product);
           }
           return null;
    }

    @Override
    public String saveFile(MultipartFile uploadFile, EFileType eFileType, Catalog catalog) {
        if(eFileType.equals(EFileType.DOCUMENT)) {
            return null;
        }
        if (eFileType.equals(EFileType.IMAGE)){
            return this.imageUtilsService.saveImageFile(uploadFile,catalog);
        }
        return null;
    }

    private String createProductImageUrl(Product product, ProductFile productFile){
        return globalProperty.getPRODUCT_BASE_URL()+"images/"+product.getAlias()+"/"+productFile.getUrl();
    }

    private String createCatalogImageUrl(Catalog catalog){
        return globalProperty.getCATALOG_BASE_URL()+"images/"+catalog.getAlias()+"/"+catalog.getImage();
    }
}
