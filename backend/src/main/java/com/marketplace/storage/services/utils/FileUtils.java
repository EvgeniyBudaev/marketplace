package com.marketplace.storage.services.utils;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface FileUtils {
    boolean createIfNotExistProductDir(Path path);

    byte[] compressImage(byte[] data);

    byte[] decompressImage(byte[] data);

    Boolean saveFileOnFileSystem(MultipartFile file, Path path);

    Boolean deleteFileFromFileSystem(Path path);
}
