package com.marketplace.backend.controller;

import com.marketplace.backend.dao.ManageProductDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductSimpleDto;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ProductUrlResolver;
import com.marketplace.backend.service.utils.queryes.ProductUrlResolverImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;


@RestController
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {
    private final ProductDao productDao;
    private final ManageProductDao manageProductDao;

    @Autowired
    public ProductController(ProductDao productDao, ManageProductDao manageProductDao) {
        this.productDao = productDao;
        this.manageProductDao = manageProductDao;
    }


    @GetMapping("/page/")
    public Paging<ResponseProductDto> findProductInCatalog(HttpServletRequest request){
        ProductUrlResolver urlResolver = new ProductUrlResolverImpl();
        String queryString = URLDecoder.decode(request.getQueryString(), StandardCharsets.UTF_8);
        return productDao
                .findProductsInCatalog(urlResolver
                        .resolveQuery(queryString));
    }

    @GetMapping("/by_alias")
    public ResponseProductDto getProductByAlias(@RequestParam(value = "alias") String alias) {
        return new ResponseProductDto(productDao.findProductByAlias(alias),alias);

    }

    @GetMapping("/find")
    public Paging<ResponseProductDto> findAllByLikeName(
            @RequestParam(defaultValue = "1",required = false) Integer page,
            @RequestParam(defaultValue = "15",required = false) Integer pageSize,
            @RequestParam(required = false) String search){
        if(page<1){
            page=1;
        }
        if(pageSize<5){
            pageSize = 5;
        }
        return productDao.findProductLikeName(page,pageSize, search);
    }

    @GetMapping("/get_all")
    public Paging<ResponseProductSimpleDto> findAll(
            @RequestParam(defaultValue = "1",required = false) Integer page,
            @RequestParam(defaultValue = "15",required = false) Integer size,
            @RequestParam(name = "search",required = false)String find){
        if(page<1){
            page=1;
        }
        if(size<5){
            size = 5;
        }
        return productDao.findAll(page,size);

    }
    @PostMapping
    public ResponseProductDto saveOrUpdateProduct(@Valid @RequestBody RequestSaveProductDto productDto) {
        Product product=manageProductDao.save(productDto);
        return new ResponseProductDto(product,productDto.getCatalogAlias());
    }


    @DeleteMapping("/{alias}")
    public String deleteProduct(@PathVariable String alias) {
        manageProductDao.delete(alias);
        return "Product with alias = " + alias + " was deleted";
    }

}
