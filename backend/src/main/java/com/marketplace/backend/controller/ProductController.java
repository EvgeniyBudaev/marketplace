package com.marketplace.backend.controller;

import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.converters.ProductConverters;
import com.marketplace.backend.dto.request.product.RequestSaveProductDto;
import com.marketplace.backend.dto.response.product.ResponseProductDto;
import com.marketplace.backend.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
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

    @GetMapping
    public List<Product> showAllProducts() {
        return productDao.getAll();
    }

    @GetMapping("/all_by_page")
    public Page<ResponseProductDto> showAllProductsByPage(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                  @RequestParam(name = "count", defaultValue = "10") Integer countOfPage){
        log.info("Запрос на продукты пришел 8");
        return productDao.productWithPage(page,countOfPage)
                .map(x->productConverters.convertProductToResponseProductDto(x,x.getCatalog().getId()));
    }

    @GetMapping("/catalog")
    public List<ResponseProductDto> findProductInCatalogByAlias(@RequestParam(value = "catalog") String catalog){
        return productDao.findProductsInCatalogByAlias(catalog)
                .stream().map(productConverters::convertProductToResponseProductDto).collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public ResponseProductDto getProduct(@PathVariable Long id) {
        Product product = productDao.findById(id);
        return productConverters.convertProductToResponseProductDto(product, product.getCatalog().getId());
    }

    @GetMapping("/alias")
    public ResponseProductDto getProductByAlias(@RequestParam(value = "alias") String alias) {
        Product product = productDao.findProductByAlias(alias);
        return productConverters.convertProductToResponseProductDto(product, product.getCatalog().getId());
    }

    @PostMapping
    public ResponseProductDto saveOrNewProduct(@Valid @RequestBody RequestSaveProductDto productDto) {
        Product product=productDao.save(productDto);
        return productConverters.convertProductToResponseProductDto(product,product.getCatalog().getId());
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productDao.delete(id);
        return "Product with ID = " + id + " was deleted";
    }
}
