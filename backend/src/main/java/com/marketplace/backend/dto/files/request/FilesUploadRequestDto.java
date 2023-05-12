package com.marketplace.backend.dto.files.request;

import com.marketplace.backend.model.EFileType;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class FilesUploadRequestDto {
    @NotNull
    private String productAlias;
    @NotNull
    private EFileType fileType;
}
