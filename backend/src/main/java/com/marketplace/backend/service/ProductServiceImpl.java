package com.marketplace.backend.service;

import com.marketplace.backend.entity.Product;
import com.marketplace.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product getProduct(long id) {
        Product product = null;
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isPresent()) {
            product = optional.get();
        }
        return product;
    }

    @Override
    public void deleteProduct(long id) {
        productRepository.deleteById(id);
    }
}
