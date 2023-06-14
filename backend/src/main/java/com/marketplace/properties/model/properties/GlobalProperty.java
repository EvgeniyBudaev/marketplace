package com.marketplace.properties.model.properties;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
@Getter
@Setter
@Slf4j
@Component
public class GlobalProperty {
    private final String PRODUCT_BASE_URL = "http://localhost:8080/api/v1/products/files/";
    private final Path PRODUCT_IMAGE_DIR;
    private final Path PRODUCT_DOC_DIR;
    private final String CATALOG_BASE_URL = "http://localhost:8080/api/v1/catalogs/files/";
    private final Path CATALOG_IMAGE_DIR;
    private final Path CATALOG_DOC_DIR;
    private Boolean isProductImageDirectoryAvailability = true;
    private Boolean isProductDocDirectoryAvailability = true;
    private Boolean isCatalogImageDirectoryAvailability = true;
    private Boolean isCatalogDocDirectoryAvailability = true;

    public GlobalProperty() {
        Path appPath = Path.of(System.getProperty("user.dir"));
        this.PRODUCT_IMAGE_DIR = Path.of(appPath.toString(), "MARKETPLACE/PRODUCT/IMAGE");
        this.PRODUCT_DOC_DIR = Path.of(appPath.toString(), "MARKETPLACE/PRODUCT/DOC");
        this.CATALOG_IMAGE_DIR = Path.of(appPath.toString(),"MARKETPLACE/CATALOG/IMAGE");
        this.CATALOG_DOC_DIR = Path.of(appPath.toString(),"MARKETPLACE/CATALOG/DOC");
    }
    @PostConstruct
    public void init() {
        if (!Files.exists(PRODUCT_IMAGE_DIR)) {
            try {
                Files.createDirectories(PRODUCT_IMAGE_DIR);
            } catch (IOException e) {
                log.error("PRODUCT IMAGES DIRECTORY NOT AVAILABILITY");
                log.error(Arrays.toString(e.getStackTrace()));
                this.isProductImageDirectoryAvailability = false;
            }
        }
        if (!Files.exists(PRODUCT_DOC_DIR)) {
            try {
                Files.createDirectories(PRODUCT_DOC_DIR);
            } catch (IOException e) {
                log.error("PRODUCT DOCUMENTS DIRECTORY NOT AVAILABILITY");
                log.error(Arrays.toString(e.getStackTrace()));
                this.isProductDocDirectoryAvailability = false;
            }
        }
        if (!Files.exists(CATALOG_IMAGE_DIR)) {
            try {
                Files.createDirectories(CATALOG_IMAGE_DIR);
            } catch (IOException e) {
                log.error("CATALOG IMAGES DIRECTORY NOT AVAILABILITY");
                log.error(Arrays.toString(e.getStackTrace()));
                this.isCatalogImageDirectoryAvailability = false;
            }
        }
        if (!Files.exists(CATALOG_DOC_DIR)) {
            try {
                Files.createDirectories(CATALOG_DOC_DIR);
            } catch (IOException e) {
                log.error("CATALOG DOCUMENTS DIRECTORY NOT AVAILABILITY");
                log.error(Arrays.toString(e.getStackTrace()));
                this.isCatalogImageDirectoryAvailability = false;
            }
        }
    }
}
