package com.marketplace.backend.controller;

import com.marketplace.backend.dao.ManageProductDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.request.RequestSaveWithImageProductDto;
import com.marketplace.backend.dto.product.request.RequestUpdateWithImageProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDtoForAdmin;
import com.marketplace.backend.dto.product.response.ResponseProductGetAllDto;
import com.marketplace.backend.exception.AppError;
import com.marketplace.backend.exception.IllegalRequestParam;
import com.marketplace.backend.mappers.ProductMapper;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.*;
import com.marketplace.storage.models.EFileType;
import com.marketplace.storage.services.DocumentStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;


@RestController
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {
    private final ProductDao productDao;
    private final ProductMapper productMapper;
    private final ManageProductDao manageProductDao;
    private final DocumentStorageService documentStorageService;

    @Autowired
    public ProductController(ProductDao productDao, ProductMapper productMapper, ManageProductDao manageProductDao, DocumentStorageService documentStorageService) {
        this.productDao = productDao;
        this.productMapper = productMapper;
        this.manageProductDao = manageProductDao;
        this.documentStorageService = documentStorageService;
    }


    @GetMapping("/page/")
    public Paging<ResponseProductDto> findProductInCatalog(HttpServletRequest request) {
        ProductUrlResolver urlResolver = new ProductUrlResolverImpl();
        String queryString = URLDecoder.decode(request.getQueryString(), StandardCharsets.UTF_8);
        return productDao
                .findProductsInCatalog(urlResolver
                        .resolveQuery(queryString));
    }

    @GetMapping("/by_alias")
    public ResponseProductDto getProductByAlias(@RequestParam(value = "alias") String alias) {
        Product product = productDao.findProductByAlias(alias);
        String defaultImage = documentStorageService.getDefaultImageUrl(product);
        List<String> images = documentStorageService.getImageUrls(product);
        return new ResponseProductDto(product,product.getCatalog().getAlias(),images,defaultImage);

    }

    @GetMapping("/find")
    public Paging<ResponseProductDto> findAllByLikeName(
            @RequestParam(defaultValue = "1", required = false) Integer page,
            @RequestParam(defaultValue = "15", required = false) Integer pageSize,
            @RequestParam(required = false) String search) {
        if (page < 1) {
            page = 1;
        }
        if (pageSize < 5) {
            pageSize = 5;
        }
        return productDao.findProductLikeName(page, pageSize, search);
    }

    @GetMapping("/get_all")
    public Paging<ResponseProductGetAllDto> findAll(HttpServletRequest request) {
        String rawQueryString = request.getQueryString();
        String queryString = null;
        if (rawQueryString != null) {
            queryString = URLDecoder.decode(rawQueryString, StandardCharsets.UTF_8);
        }
        UrlResolver resolver = new UrlResolverImpl();
        QueryParam param = resolver.resolveQueryString(queryString);
        return productDao.findAll(param);

    }

    @PostMapping(value = "/save")
    public ResponseProductDto saveWithImageProduct(@Valid RequestSaveWithImageProductDto productDto,@RequestParam(name = "defaultImage",required = false) MultipartFile defaultImage, @RequestParam(name = "files",required = false)MultipartFile[] files) {
        return manageProductDao.save(productDto,defaultImage,files);
    }
    @PutMapping("/put")
    public ResponseProductDto updateProduct(@Valid RequestUpdateWithImageProductDto productDto, @RequestParam(name = "defaultImage",required = false) Object defaultImage, @RequestParam(name = "files",required = false)MultipartFile[] files) {
        Product product = manageProductDao.update(productDto);
        if(files!=null&&files.length!=0){
            if(product.getProductFiles()==null){
                product.setProductFiles(new HashSet<>(files.length));
            }
            for (MultipartFile file : files) {
                product.getProductFiles().add(documentStorageService.saveFile(file, EFileType.IMAGE,product));
            }
        }
        if(defaultImage!=null){
            try {
                MultipartFile  defaultImageFile = (MultipartFile) defaultImage;
                product.getProductFiles().add(documentStorageService.saveFile(defaultImageFile, EFileType.IMAGE, product));
                manageProductDao.setDefaultFile(product.getProductFiles(),defaultImageFile.getOriginalFilename());
            }catch (ClassCastException e){
                try {
                    String path = URI.create((String) defaultImage).getPath();
                    String defaultImageFileName = path.substring(path.lastIndexOf('/') + 1);
                    manageProductDao.setDefaultFile(product.getProductFiles(),defaultImageFileName);
                }catch (ClassCastException ex){
                    throw new IllegalRequestParam("Не удалось распознать defaultImage");
                }
            }

        }
        String savedDefaultImage = documentStorageService.getDefaultImageUrl(product);
        List<String> images = documentStorageService.getImageUrls(product);
        return new ResponseProductDto(product,product.getCatalog().getAlias(),images,savedDefaultImage);
    }

    @DeleteMapping("delete/{alias}")
    public ResponseEntity<?> deleteProduct(@PathVariable String alias) {
        Integer countProductMarkAsDeleted = manageProductDao.delete(alias);
        if (countProductMarkAsDeleted < 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AppError(HttpStatus.BAD_REQUEST.name(), "Не найден продукт с псевдонимом: " + alias));
        }
        return ResponseEntity.ok("Product with alias = " + alias + " was deleted");
    }

    @GetMapping("/admin/by_alias")
    public ResponseProductDtoForAdmin getProductByAliasForAdmin(@RequestParam(value = "alias") String alias) {
        Product product = productDao.findProductByAlias(alias);
        String savedDefaultImage = documentStorageService.getDefaultImageUrl(product);
        List<String> images = documentStorageService.getImageUrls(product);
        ResponseProductDtoForAdmin dto = new ResponseProductDtoForAdmin(product,product.getCatalog().getAlias(),images,savedDefaultImage);
        if (product.getDoubleValues() != null) {
            dto.setAttributeValuesSet(productMapper.numValuesToDtoForAdmin(product.getDoubleValues()));
        }
        if (product.getSelectableValues() != null) {
            if (dto.getAttributeValuesSet() == null) {
                dto.setAttributeValuesSet(productMapper.
                        selValuesToDtoForAdmin(product.getSelectableValues()));
            } else {
                dto.getAttributeValuesSet().addAll(productMapper.
                        selValuesToDtoForAdmin(product.getSelectableValues()));
            }
        }
        return dto;
    }



}
