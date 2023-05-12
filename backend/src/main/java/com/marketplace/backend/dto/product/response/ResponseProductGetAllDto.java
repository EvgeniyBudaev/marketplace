package com.marketplace.backend.dto.product.response;

import com.marketplace.backend.model.EFileType;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.utils.FileUtils;
import com.marketplace.properties.model.properties.GlobalProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ResponseProductGetAllDto {
    private Long id;
    private String name;
    private String alias;
    private Boolean enabled;
    private LocalDateTime modifyDate;
    private LocalDateTime createdAt;
    private Set<String> images;

    public ResponseProductGetAllDto(Product product, GlobalProperty globalProperty){
        this.setId(product.getId());
        this.setName(product.getName());
        this.setAlias(product.getAlias());
        this.setEnabled(product.getEnabled());
        this.setModifyDate(product.getModifyDate());
        this.setCreatedAt(product.getCreatedAt());
        this.images = product.getProductFiles().stream().map(productFile -> {
            if (productFile.getFileType().equals(EFileType.DOCUMENT)){
                return null;
            }
            return FileUtils.createUrl(productFile.getUrl(),EFileType.IMAGE,globalProperty.getBASE_URL());
        }).collect(Collectors.toSet());
    }

}
