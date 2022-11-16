package com.marketplace.backend.service;

import com.marketplace.backend.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    void saveProduct(Product product);

    Product getProduct(long id);

    void deleteProduct(long id);
}
