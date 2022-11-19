package com.marketplace.backend.dto.converters;

import com.marketplace.backend.dto.request.product.RequestSaveProductDto;
import com.marketplace.backend.dto.response.product.ResponseProductDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Product;
import org.springframework.stereotype.Service;

@Service
public class ProductConverters {

    public Product requestSaveProductDtoToProduct(RequestSaveProductDto dto, Catalog catalog){
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setAlias(dto.getAlias());
        product.setEnabled(dto.getEnabled());
        product.setCatalog(catalog);
        return product;
    }

    public ResponseProductDto convertProductToResponseProductDto(Product product, Long catalogId){
        ResponseProductDto responseDto = new ResponseProductDto();
        responseDto.setId(product.getId());
        responseDto.setName(product.getName());
        responseDto.setAlias(product.getAlias());
        responseDto.setEnabled(product.getEnabled());
        responseDto.setCatalogId(catalogId);
        return responseDto;
    }
    public ResponseProductDto convertProductToResponseProductDto(Product product){
        ResponseProductDto responseDto = new ResponseProductDto();
        responseDto.setId(product.getId());
        responseDto.setName(product.getName());
        responseDto.setAlias(product.getAlias());
        responseDto.setEnabled(product.getEnabled());
        responseDto.setCatalogId(1L);
        return responseDto;
    }
}
