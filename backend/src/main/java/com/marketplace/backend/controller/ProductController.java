package com.marketplace.backend.controller;

import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.converters.ProductConverters;
import com.marketplace.backend.dto.request.product.RequestSaveProductDto;
import com.marketplace.backend.dto.response.product.ResponseProductDto;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GetMapping("/page")
    public Paging<ResponseProductDto> findProductInCatalogByAlias(@RequestParam(value = "catalog") String catalogAlias,
                                                                  @RequestParam(name = "page", defaultValue = "1") Integer page,
                                                                  @RequestParam(name = "size", defaultValue = "5") Integer pageSize,
                                                                  @RequestParam Map<String,String> filters){
        if (page < 1) {
            page = 1;
        }
        if (pageSize <1){
            pageSize = 5;
        }
        Paging<Product> resultQuery= productDao.findProductsInCatalogByAlias(catalogAlias,page, pageSize, filters);
        Paging<ResponseProductDto> result = new Paging<>();
        result.setPageSize(resultQuery.getPageSize());
        result.setCurrentPage(resultQuery.getCurrentPage());
        result.setContent(resultQuery.getContent()
                .stream().map(x->productConverters.convertProductToResponseProductDto(x,catalogAlias)).collect(Collectors.toList()));
        return result;
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
