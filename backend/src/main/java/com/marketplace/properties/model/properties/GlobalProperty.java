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
    private final String BASE_URL = "http://localhost:8080/api/v1/products/files/";
    private final Path IMAGE_DIR;
    private final Path DOC_DIR;
    private Boolean isImageDirectoryAvailability = true;
    private Boolean isDocDirectoryAvailability = true;

    public GlobalProperty() {
        Path appPath = Path.of(System.getProperty("user.dir"));
        this.IMAGE_DIR = Path.of(appPath.toString(), "MARKETPLACE/IMAGE");
        this.DOC_DIR = Path.of(appPath.toString(), "MARKETPLACE/DOC");
    }
    @PostConstruct
    public void init() {
        if (!Files.exists(IMAGE_DIR)) {
            try {
                Files.createDirectories(IMAGE_DIR);
            } catch (IOException e) {
                log.error("IMAGES DIRECTORY NOT AVAILABILITY");
                log.error(Arrays.toString(e.getStackTrace()));
                this.isImageDirectoryAvailability = false;
            }
        }
        if (!Files.exists(DOC_DIR)) {
            try {
                Files.createDirectories(DOC_DIR);
            } catch (IOException e) {
                log.error("DOCUMENTS DIRECTORY NOT AVAILABILITY");
                log.error(Arrays.toString(e.getStackTrace()));
                this.isDocDirectoryAvailability = false;
            }
        }
    }
}
