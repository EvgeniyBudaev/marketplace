package com.marketplace.backend.controller;


import com.marketplace.backend.service.AdminFilesService;
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
    private final AdminFilesService filesService;


    public AdminFilesController(GlobalProperty globalProperty, AdminFilesService filesService) {
        this.globalProperty = globalProperty;
        this.filesService = filesService;
    }



    @GetMapping("/images/{productAlias}/{fileName}")
    public ResponseEntity<?> getImageByUrl(@PathVariable String productAlias,
                                           @PathVariable String fileName) {
        Long productId = filesService.findProductIdByAlias(productAlias);
        Path path = globalProperty.getIMAGE_DIR().resolve(Path.of(productId.toString(), fileName));
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
