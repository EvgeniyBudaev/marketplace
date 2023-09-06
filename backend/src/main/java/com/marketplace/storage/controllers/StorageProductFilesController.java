package com.marketplace.storage.controllers;



import com.marketplace.backend.dao.ProductDao;
import com.marketplace.properties.model.properties.GlobalProperty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/products/files")
@Slf4j
public class StorageProductFilesController {
    private final GlobalProperty globalProperty;
    private final ProductDao productDao;



    public StorageProductFilesController(GlobalProperty globalProperty, ProductDao productDao) {
        this.globalProperty = globalProperty;
        this.productDao = productDao;
    }



    @GetMapping("/images/{productAlias}/{fileName}")
    public ResponseEntity<?> getImageByUrl(@PathVariable String productAlias,
                                           @PathVariable String fileName) {
        Long productId = productDao.findProductIdByAlias(productAlias);
        Path path = globalProperty.getPRODUCT_IMAGE_DIR().resolve(Path.of(productId.toString(), fileName));
        if (!Files.exists(path)) {
            return new ResponseEntity<>("Файл отсутствует", HttpStatus.NOT_FOUND);
        }
        try {
            byte[] file = Files.readAllBytes(path);
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf(Files.probeContentType(path)))
                    .body(file);
        } catch (IOException e) {
            log.error(Arrays.toString(e.getStackTrace()));
            return new ResponseEntity<>("Невозможно прочитать файл", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
