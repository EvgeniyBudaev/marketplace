package com.marketplace.backend.dto.catalog.request;




import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;


@Data
public class RequestSaveCatalogDto {
    private Long id;
    @NotNull
    @Size(min = 5,max = 250)
    private String name;
    @NotNull
    @Size(min = 5,max = 250)
    private String alias;
    @NotNull
    @Size(min = 5,max = 250)
    private String image;
    @NotEmpty
    private List<String> attributeAlias;
}
