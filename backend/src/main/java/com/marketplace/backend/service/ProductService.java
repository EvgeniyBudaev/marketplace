package com.marketplace.backend.service;

import com.marketplace.backend.dao.ProductDao;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductService implements ProductDao {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAll() {
        List<Product> list = new ArrayList<>();
        productRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product findById(Long id) {
        return  productRepository.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Page<Product> productWithPage(Integer pageNumber, Integer countOfPage) {
        Pageable pageRequest = PageRequest.of(pageNumber, countOfPage);
        return productRepository.findAll(pageRequest);
    }
}
