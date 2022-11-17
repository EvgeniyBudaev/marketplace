package com.marketplace.backend.controller;

import com.marketplace.backend.model.Product;
import com.marketplace.backend.dao.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProductController {
    @Autowired
    private ProductDao productDao;

    @GetMapping("/products")
    public List<Product> showAllProducts() {
        return productDao.getAll();
    }

    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable long id) {
        return productDao.getById(id);
    }

    @PostMapping("/products")
    public Product addNewProduct(@RequestBody Product product) {
        productDao.save(product);
        return product;
    }

    @PutMapping("/products")
    public Product updateProduct(@RequestBody Product product) {
        productDao.save(product);
        return product;
    }

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable long id) {
        productDao.delete(id);
        return "Product with ID = " + id + " was deleted";
    }
}
