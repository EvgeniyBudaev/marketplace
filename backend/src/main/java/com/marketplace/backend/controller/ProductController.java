package com.marketplace.backend.controller;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.dto.converters.ProductConverters;
import com.marketplace.backend.dto.request.product.RequestSaveProductDto;
import com.marketplace.backend.dto.response.product.ResponseProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductController {
    @Autowired
    private ProductDao productDao;

    @Autowired
    private CatalogDao catalogDao;

    @Autowired
    private ProductConverters productConverters;

    @GetMapping("/products")
    public List<Product> showAllProducts() {
        return productDao.getAll();
    }

    @GetMapping("/all_by_page")
    public Page<ResponseProductDto> showAllByPage(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                  @RequestParam(name = "count", defaultValue = "10") Integer countOfPage){
        return productDao.productWithPage(page,countOfPage)
                .map(x->productConverters.convertProductToResponseProductDto(x,x.getCatalog().getId()));
    }
    @GetMapping("/products/{id}")
    public ResponseProductDto getProduct(@PathVariable Long id) {
        Product product = productDao.findById(id);
        return productConverters.convertProductToResponseProductDto(product, product.getCatalog().getId());
    }

    @PostMapping("/products")
    public ResponseProductDto saveOrNewProduct(@RequestBody RequestSaveProductDto productDto) {
        Catalog catalog = catalogDao.findById(productDto.getCatalogId());
        Product product = productConverters.requestSaveProductDtoToProduct(productDto,catalog);
        productDao.save(product);
        return productConverters.convertProductToResponseProductDto(product,catalog.getId());
    }

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productDao.delete(id);
        return "Product with ID = " + id + " was deleted";
    }
}
