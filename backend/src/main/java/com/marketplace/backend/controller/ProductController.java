package com.marketplace.backend.controller;

import com.marketplace.backend.dao.ManageProductDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.request.RequestSaveWithImageProductDto;
import com.marketplace.backend.dto.product.request.RequestUpdateWithImageProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDtoForAdmin;
import com.marketplace.backend.dto.product.response.ResponseProductGetAllDto;
import com.marketplace.backend.exception.AppError;
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.mappers.ProductMapper;
import com.marketplace.backend.model.*;
import com.marketplace.backend.service.utils.queryes.*;
import com.marketplace.backend.utils.FileUtils;
import com.marketplace.properties.model.properties.GlobalProperty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.Objects;



@RestController
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {
    private final ProductDao productDao;
    private final ProductMapper productMapper;
    private final ManageProductDao manageProductDao;
    private final GlobalProperty globalProperty;
    private final FileUtils fileUtils;

    @Autowired
    public ProductController(ProductDao productDao, ProductMapper productMapper, ManageProductDao manageProductDao, GlobalProperty globalProperty, FileUtils fileUtils) {
        this.productDao = productDao;
        this.productMapper = productMapper;
        this.manageProductDao = manageProductDao;
        this.globalProperty = globalProperty;
        this.fileUtils = fileUtils;
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
        return new ResponseProductDto(productDao.findProductByAlias(alias), alias,globalProperty.getBASE_URL());

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
    public ResponseProductDto saveWithImageProduct(@Valid RequestSaveWithImageProductDto productDto, @RequestParam(name = "files",required = false)MultipartFile[] files) {
        Product product = manageProductDao.save(productDto);
        if(files!=null&&files.length!=0){
            product.setProductFiles(new HashSet<>(files.length));
            for (MultipartFile file : files) {
                product.getProductFiles().add(saveFile(file, EFileType.IMAGE, product,productDto.getDefaultImage()));
            }
        }
        return new ResponseProductDto(product, productDto.getCatalogAlias(),globalProperty.getBASE_URL());
    }
    @PutMapping("/put")
    public ResponseProductDto updateProduct(@Valid RequestUpdateWithImageProductDto productDto, @RequestParam(name = "files",required = false)MultipartFile[] files) {
        Product product = manageProductDao.update(productDto);
        for (MultipartFile file : files) {
            product.getProductFiles().add(saveFile(file, EFileType.IMAGE, product,productDto.getDefaultImage()));
        }
        return new ResponseProductDto(product, productDto.getCatalogAlias(),globalProperty.getBASE_URL());
    }

    @DeleteMapping("delete/{alias}")
    public ResponseEntity<?> deleteProduct(@PathVariable String alias) {
        Integer countProductMarkAsDeleted = manageProductDao.delete(alias);
        if (countProductMarkAsDeleted < 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AppError(HttpStatus.BAD_REQUEST.name(), "Не найден продукт с псевдониммом: " + alias));
        }
        return ResponseEntity.ok("Product with alias = " + alias + " was deleted");
    }

    @GetMapping("/admin/by_alias")
    public ResponseProductDtoForAdmin getProductByAliasForAdmin(@RequestParam(value = "alias") String alias) {
        Product product = productDao.findProductByAlias(alias);
        ResponseProductDtoForAdmin dto = productMapper.entityToDtoForAdmin(product);
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

    private ProductFile saveFile(MultipartFile uploadFile,EFileType eFileType,Product product,String defaultImage){
        if (eFileType.equals(EFileType.IMAGE) && globalProperty.getIsImageDirectoryAvailability()) {
            if (fileUtils.checkImageFile(uploadFile)) {
                Path imageDir = Path.of(globalProperty.getIMAGE_DIR().toString(), product.getCatalog().getAlias(), product.getAlias());
                if (!fileUtils.createIfNotExistProductDir(imageDir)) {
                    throw new OperationNotAllowedException("Не удалось создать директорию продукта");
                }
                EImageStatus status =null;
                if(Objects.equals(uploadFile.getOriginalFilename(), defaultImage)){
                    status=EImageStatus.DEFAULT;
                }
                Path filePath = Path.of(imageDir.toString(), uploadFile.getOriginalFilename());
                if (manageProductDao.saveFileOnFileSystem(uploadFile, filePath)) {
                    Path relativePath = globalProperty.getIMAGE_DIR().relativize(filePath);
                    return manageProductDao.saveFileDescription(product, relativePath.toString(), EFileType.IMAGE,status);
                    /*return ResponseEntity.ok(FileUtils.createUrl(file.getUrl(), EFileType.IMAGE,globalProperty.getBASE_URL()));*/
                } else {
                    throw new OperationNotAllowedException("Не удалось сохранить файл");
                }
            } else {
                throw new OperationNotAllowedException("Файл не является изображением");
            }
        }
        if (eFileType.equals(EFileType.DOCUMENT) && globalProperty.getIsDocDirectoryAvailability()) {
            Path docDir = Path.of(globalProperty.getDOC_DIR().toString(), product.getCatalog().getAlias(), product.getAlias());
            if (!fileUtils.createIfNotExistProductDir(docDir)) {
                throw new OperationNotAllowedException("Не удалось создать директорию продукта");
            }
            Path filePath = Path.of(docDir.toString(), uploadFile.getOriginalFilename());
            if (manageProductDao.saveFileOnFileSystem(uploadFile, filePath)) {
                Path relativePath = globalProperty.getDOC_DIR().relativize(filePath);
                return manageProductDao.saveFileDescription(product, relativePath.toString(), EFileType.DOCUMENT,null);
            } else {
                throw new OperationNotAllowedException("Не удалось сохранить файл");
            }

        }
        throw new OperationNotAllowedException("Директория для сохранения файла не доступна");
    }
}
