package com.marketplace.backend.controller;

import com.marketplace.backend.model.Brand;
import com.marketplace.backend.service.BrandService;
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
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping("/brands")
    public List<Brand> showAllBrands() {
        return brandService.getAllBrands();
    }

    @GetMapping("/brands/{id}")
    public Brand getBrand(@PathVariable long id) {
        return brandService.getBrand(id);
    }

    @PostMapping("/brands")
    public Brand addNewBrand(@RequestBody Brand brand) {
        brandService.saveBrand(brand);
        return brand;
    }

    @PutMapping("/brands")
    public Brand updateBrand(@RequestBody Brand brand) {
        brandService.saveBrand(brand);
        return brand;
    }

    @DeleteMapping("/brands/{id}")
    public String deleteBrand(@PathVariable long id) {
        brandService.deleteBrand(id);
        return "Brand with ID = " + id + " was deleted";
    }
}
