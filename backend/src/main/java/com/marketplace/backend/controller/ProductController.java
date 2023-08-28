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
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.mappers.ProductMapper;
import com.marketplace.backend.model.EFileType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.ProductFile;
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
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.HashSet;



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
        return new ResponseProductDto(productDao.findProductByAlias(alias), alias,globalProperty.getPRODUCT_BASE_URL());

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
        Product product = manageProductDao.save(productDto);
        if(files!=null&&files.length!=0){
            product.setProductFiles(new HashSet<>(files.length));
            for (MultipartFile file : files) {
                product.getProductFiles().add(saveFile(file, EFileType.IMAGE, product));
            }
        }
        if(defaultImage!=null){
            product.getProductFiles().add(saveFile(defaultImage, EFileType.IMAGE, product));
            manageProductDao.setDefaultFile(product.getProductFiles(),defaultImage.getOriginalFilename());
        }
        return new ResponseProductDto(product, productDto.getCatalogAlias(),globalProperty.getPRODUCT_BASE_URL());
    }
    @PutMapping("/put")
    public ResponseProductDto updateProduct(@Valid RequestUpdateWithImageProductDto productDto, @RequestParam(name = "defaultImage",required = false) Object defaultImage, @RequestParam(name = "files",required = false)MultipartFile[] files) {
        Product product = manageProductDao.update(productDto);
        if(files!=null&&files.length!=0){
            if(product.getProductFiles()==null){
                product.setProductFiles(new HashSet<>(files.length));
            }
            for (MultipartFile file : files) {
                product.getProductFiles().add(saveFile(file, EFileType.IMAGE,product));
            }
        }
        if(defaultImage!=null){
            try {
                MultipartFile  defaultImageFile = (MultipartFile) defaultImage;
                product.getProductFiles().add(saveFile(defaultImageFile, EFileType.IMAGE, product));
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
        return new ResponseProductDto(product, productDto.getCatalogAlias(),globalProperty.getPRODUCT_BASE_URL());
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
        ResponseProductDtoForAdmin dto = new ResponseProductDtoForAdmin(product,product.getCatalog().getAlias(),globalProperty.getPRODUCT_BASE_URL());
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

    private ProductFile saveFile(MultipartFile uploadFile,EFileType eFileType,Product product){
        if (eFileType.equals(EFileType.IMAGE) && Boolean.TRUE.equals(globalProperty.getIsProductImageDirectoryAvailability())) {
            if (Boolean.TRUE.equals(fileUtils.checkImageFile(uploadFile))) {
                Path imageDir = Path.of(globalProperty.getPRODUCT_IMAGE_DIR().toString(), product.getId().toString());
                if (!fileUtils.createIfNotExistProductDir(imageDir)) {
                    throw new OperationNotAllowedException("Не удалось создать директорию продукта");
                }
                Path filePath = Path.of(imageDir.toString(), uploadFile.getOriginalFilename());
                if (Boolean.TRUE.equals(manageProductDao.saveFileOnFileSystem(uploadFile,filePath))) {
                    return manageProductDao.saveFileDescription(product, uploadFile.getOriginalFilename(), EFileType.IMAGE);
                } else {
                    throw new OperationNotAllowedException("Не удалось сохранить файл");
                }
            } else {
                throw new OperationNotAllowedException("Файл не является изображением: " +uploadFile.getOriginalFilename());
            }
        }
        throw new OperationNotAllowedException("Директория для сохранения файла не доступна");
    }

}
