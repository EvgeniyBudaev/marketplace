package com.marketplace.backend.service;

import com.marketplace.backend.entity.Brand;
import com.marketplace.backend.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public void saveBrand(Brand brand) {
        brandRepository.save(brand);
    }

    @Override
    public Brand getBrand(long id) {
        Brand brand = null;
        Optional<Brand> optional = brandRepository.findById(id);
        if (optional.isPresent()) {
            brand = optional.get();
        }
        return brand;
    }

    @Override
    public void deleteBrand(long id) {
        brandRepository.deleteById(id);
    }
}
