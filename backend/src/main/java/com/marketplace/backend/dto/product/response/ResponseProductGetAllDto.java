package com.marketplace.backend.dto.product.response;

import com.marketplace.backend.model.Product;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ResponseProductGetAllDto {
    private Long id;
    private String name;
    private String alias;
    private Boolean enabled;
    private LocalDateTime modifyDate;
    private LocalDateTime createdAt;
    private List<String> images;

    public ResponseProductGetAllDto(Product product, List<String> images){
        this.setId(product.getId());
        this.setName(product.getName());
        this.setAlias(product.getAlias());
        this.setEnabled(product.getEnabled());
        this.setModifyDate(product.getModifyDate());
        this.setCreatedAt(product.getCreatedAt());
        if(images!=null&&!images.isEmpty()){
            this.images=images;
        }else {
            this.images=null;
        }
    }

}
