package com.marketplace.backend.service;

import com.marketplace.backend.dao.BrandDao;
import com.marketplace.backend.model.Brand;
import com.marketplace.backend.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService implements BrandDao {
    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public void save(Brand brand) {
        brandRepository.save(brand);
    }

    @Override
    public Brand findById(Long id) {
        Brand brand = null;
        Optional<Brand> optional = brandRepository.findById(id);
        if (optional.isPresent()) {
            brand = optional.get();
        }
        return brand;
    }

    @Override
    public void delete(Long id) {
        brandRepository.deleteById(id);
    }
}
