package com.marketplace.backend.service;

import com.marketplace.backend.entity.Brand;

import java.util.List;

public interface BrandService {
    List<Brand> getAllBrands();

    void saveBrand(Brand brand);

    Brand getBrand(long id);

    void deleteBrand(long id);
}
