package com.marketplace.backend.controller;

import com.marketplace.backend.dao.ManageProductDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.product.ProductConverters;
import com.marketplace.backend.dto.product.request.RequestSaveProductDto;
import com.marketplace.backend.dto.product.response.ResponseProductDto;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.service.utils.queryes.ProductUrlResolver;
import com.marketplace.backend.service.utils.queryes.ProductUrlResolverImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {
    private final ProductDao productDao;
    private final ManageProductDao manageProductDao;
    private final ProductConverters productConverters;

    public ProductController(ProductDao productDao, ManageProductDao manageProductDao, ProductConverters productConverters) {
        this.productDao = productDao;
        this.manageProductDao = manageProductDao;
        this.productConverters = productConverters;
    }

    @GetMapping("/page/")
    public Paging<ResponseProductDto> findProductInCatalog(HttpServletRequest request){
        ProductUrlResolver urlResolver = new ProductUrlResolverImpl();
        return productDao
                .findProductsInCatalog(urlResolver
                        .resolveQuery(request.getQueryString()));
    }

    @GetMapping("/by_alias")
    public ResponseProductDto getProductByAlias(@RequestParam(value = "alias") String alias) {
        return productDao.findProductByAlias(alias);

    }

    @GetMapping("/find")
    public Paging<ResponseProductDto> findAllByLikeName(
            @RequestParam(defaultValue = "1",required = false) Integer page,
            @RequestParam(defaultValue = "15",required = false) Integer pageSize,
            @RequestParam @NotNull String search){
        if(page<1){
            page=1;
        }
        if(pageSize<5){
            pageSize = 5;
        }
        return productDao.findProductLikeName(page,pageSize, search);
    }

    @PostMapping
    public ResponseProductDto saveOrNewProduct(@Valid @RequestBody RequestSaveProductDto productDto) {
        Product product=manageProductDao.save(productDto);
        return productConverters.convertProductToResponseProductDto(product,productDto.getCatalogAlias());
    }

    @DeleteMapping("/{alias}")
    public String deleteProduct(@PathVariable String alias) {
        manageProductDao.delete(alias);
        return "Product with alias = " + alias + " was deleted";
    }
}
