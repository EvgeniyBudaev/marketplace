package com.marketplace.backend.controller;

import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.ProductConverters;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {
    private final ProductDao productDao;
    private final ProductConverters productConverters;

    public ProductController(ProductDao productDao, ProductConverters productConverters) {
        this.productDao = productDao;
        this.productConverters = productConverters;
    }

    @GetMapping("/page/")
    public Paging<ResponseProductDto> findProductInCatalog(@RequestParam MultiValueMap<String, String> allParameters){

        int page;
        List<String> pageList = allParameters.remove("page");
        if(pageList==null){
            page = 1;
        }else {
            page = Integer.parseInt(pageList.get(0));
            if(page<1){
                page=1;
            }
        }
        int pageSize;
        List<String> pageSizeList = allParameters.remove("pagesize");
        if(pageList==null){
            pageSize = 5;
        }else {
            pageSize = Integer.parseInt(pageSizeList.get(0));
            if(pageSize<5){
                pageSize=5;
            }
        }
        List<String> catalogList = allParameters.remove("catalog");
       if(catalogList==null){
           throw new ResourceNotFoundException("В параметрах запроса не указан или указан неправильно каталог");
       }
        String catalogAlias = catalogList.get(0);

        return productDao.findProductsInCatalog(catalogAlias,page,pageSize,allParameters);
    }

    @GetMapping("/by_alias")
    public ResponseProductDto getProductByAlias(@RequestParam(value = "alias") String alias) {
        Product product = productDao.findProductByAlias(alias);
        return productConverters.convertProductToResponseProductDto(product,product.getCatalog().getAlias());
    }

    @PostMapping
    public ResponseProductDto saveOrNewProduct(@Valid @RequestBody RequestSaveProductDto productDto) {
        Product product=productDao.save(productDto);
        return productConverters.convertProductToResponseProductDto(product,productDto.getCatalogAlias());
    }

    @DeleteMapping("/{alias}")
    public String deleteProduct(@PathVariable String alias) {
        productDao.delete(alias);
        return "Product with alias = " + alias + " was deleted";
    }
}
