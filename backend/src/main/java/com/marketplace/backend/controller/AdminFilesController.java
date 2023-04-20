package com.marketplace.backend.controller;


import com.marketplace.properties.model.properties.GlobalProperty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@RestController
@RequestMapping("/api/v1/products/files")
@Slf4j
public class AdminFilesController {
    private final GlobalProperty globalProperty;


    public AdminFilesController(GlobalProperty globalProperty) {
        this.globalProperty = globalProperty;
    }



    @GetMapping("/images/{catalogAlias}/{productAlias}/{fileName}")
    public ResponseEntity<?> getImageByUrl(@PathVariable String catalogAlias,
                                           @PathVariable String productAlias,
                                           @PathVariable String fileName) {
        char decimetre = '\\';
        Path path = globalProperty.getIMAGE_DIR().resolve(Path.of(catalogAlias + decimetre + productAlias + decimetre + fileName));
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