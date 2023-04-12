package com.marketplace.backend.controller;

import com.marketplace.backend.dto.files.request.FilesUploadRequestDto;
import com.marketplace.backend.model.EFileType;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.ProductFile;
import com.marketplace.backend.service.FilesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/products/files")
@Slf4j
public class AdminFilesController {
    private final FilesService filesService;
    private final Path IMAGE_DIR;
    private final Path DOC_DIR;
    private final String BASE_URL = "http://localhost:8080/api/v1/products/files/";
    private Boolean isImageDirectoryAvailability = true;
    private Boolean isDocDirectoryAvailability = true;

    public AdminFilesController(FilesService filesService) {
        this.filesService = filesService;
        Path appPath = Path.of(System.getProperty("user.dir"));
        this.IMAGE_DIR = Path.of(appPath.toString(), "MARKETPLACE/IMAGE");
        this.DOC_DIR = Path.of(appPath.toString(), "MARKETPLACE/DOC");
    }

    @PostConstruct
    public void init() {
        if (!Files.exists(IMAGE_DIR)) {
            try {
                Files.createDirectories(IMAGE_DIR);
            } catch (IOException e) {
                log.error("IMAGES DIRECTORY NOT AVAILABILITY");
                log.error(Arrays.toString(e.getStackTrace()));
                this.isImageDirectoryAvailability = false;
            }
        }
        if (!Files.exists(DOC_DIR)) {
            try {
                Files.createDirectories(DOC_DIR);
            } catch (IOException e) {
                log.error("DOCUMENTS DIRECTORY NOT AVAILABILITY");
                log.error(Arrays.toString(e.getStackTrace()));
                this.isDocDirectoryAvailability = false;
            }
        }
    }

    @GetMapping("/images/{catalogAlias}/{productAlias}/{fileName}")
    public ResponseEntity<?> getImageByUrl(@PathVariable String catalogAlias,
                                           @PathVariable String productAlias,
                                           @PathVariable String fileName) {
        char decimetre = '\\';
        Path path = IMAGE_DIR.resolve(Path.of(catalogAlias + decimetre + productAlias + decimetre + fileName));
        if (!Files.exists(path)) {
            return new ResponseEntity<>("Файл отсутствует", HttpStatus.NOT_FOUND);
        }
        try {
            byte[] file = Files.readAllBytes(path);
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf(Files.probeContentType(path)))
                    .body(file);
        } catch (IOException e) {
            log.error(Arrays.toString(e.getStackTrace()));
            return new ResponseEntity<>("Невозможно прочитать файл", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@Valid FilesUploadRequestDto dto,
                                        @RequestParam(name = "file") MultipartFile uploadFile) {
        Product product = filesService.getProductByAlias(dto.getProductAlias());

        if (dto.getFileType().equals(EFileType.IMAGE) && this.isImageDirectoryAvailability) {
            if (checkImageFile(uploadFile)) {
                Path imageDir = Path.of(IMAGE_DIR.toString(), product.getCatalog().getAlias(), product.getAlias());
                if (!createIfNotExistProductDir(imageDir)) {
                    return new ResponseEntity<>("Не удалось создать директорию продукта", HttpStatus.INTERNAL_SERVER_ERROR);
                }
                Path filePath = Path.of(imageDir.toString(), uploadFile.getOriginalFilename());
                if (filesService.saveFileOnFileSystem(uploadFile, filePath)) {
                    Path relativePath = IMAGE_DIR.relativize(filePath);
                    ProductFile file = filesService.saveEntity(product, relativePath.toString(), EFileType.IMAGE);
                    return ResponseEntity.ok(createUrl(file.getUrl(), EFileType.IMAGE));
                } else {
                    return new ResponseEntity<>("Не удалось сохранить файл", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>("Файл не является изображением", HttpStatus.BAD_REQUEST);
            }
        }
        if (dto.getFileType().equals(EFileType.DOCUMENT) && this.isDocDirectoryAvailability) {
            Path docDir = Path.of(IMAGE_DIR.toString(), product.getCatalog().getAlias(), product.getAlias());
            if (!createIfNotExistProductDir(docDir)) {
                return new ResponseEntity<>("Не удалось создать директорию продукта", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            Path filePath = Path.of(docDir.toString(), uploadFile.getOriginalFilename());
            if (filesService.saveFileOnFileSystem(uploadFile, filePath)) {
                Path relativePath = DOC_DIR.relativize(filePath);
                ProductFile file = filesService.saveEntity(product, relativePath.toString(), EFileType.DOCUMENT);
                return ResponseEntity.ok(createUrl(file.getUrl(), EFileType.DOCUMENT));
            } else {
                return new ResponseEntity<>("Не удалось сохранить файл", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
        return new ResponseEntity<>("Директория для сохранения файла не доступна", HttpStatus.BAD_REQUEST);
    }

    private Boolean checkImageFile(MultipartFile file) {
        String mimetype = file.getContentType();
        if (mimetype == null) {
            return false;
        }
        String[] type = mimetype.split("/");
        return type[0].equals("image");
    }

    private boolean createIfNotExistProductDir(Path path) {
        if (Files.exists(path)) {
            return true;
        }
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("win")) {
            FileAttribute<List<AclEntry>> fileAttributes = new FileAttribute<>() {

                @Override
                public String name() {
                    return "acl:acl";
                }

                @Override
                public List<AclEntry> value() {
                    FileSystem fileSystem = FileSystems.getDefault();
                    UserPrincipalLookupService userPrincipalLookupService = fileSystem.getUserPrincipalLookupService();
                    UserPrincipal userPrincipal;
                    try {
                        String username = System.getProperty("user.name");
                        System.out.println(username);
                        userPrincipal = userPrincipalLookupService.lookupPrincipalByName(username);
                    } catch (IOException e) {
                        log.error("Не найден пользователь в системе");
                        log.error(Arrays.toString(e.getStackTrace()));
                        return null;
                    }
                    if (userPrincipal == null) {
                        log.error("Не найден пользователь в системе");
                        return null;
                    }
                    Set<AclEntryFlag> flags = EnumSet.of(AclEntryFlag.FILE_INHERIT, AclEntryFlag.DIRECTORY_INHERIT);

                    // select ACL permission
                    Set<AclEntryPermission> permissions = EnumSet.of(
                            AclEntryPermission.READ_DATA,
                            AclEntryPermission.WRITE_DATA,
                            AclEntryPermission.APPEND_DATA,
                            AclEntryPermission.DELETE,
                            AclEntryPermission.READ_NAMED_ATTRS,
                            AclEntryPermission.WRITE_NAMED_ATTRS,
                            AclEntryPermission.DELETE_CHILD,
                            AclEntryPermission.READ_ATTRIBUTES,
                            AclEntryPermission.WRITE_ATTRIBUTES,
                            AclEntryPermission.READ_ACL,
                            AclEntryPermission.WRITE_ACL,
                            AclEntryPermission.WRITE_OWNER,
                            AclEntryPermission.SYNCHRONIZE,
                            AclEntryPermission.ADD_SUBDIRECTORY,
                            AclEntryPermission.ADD_FILE,
                            AclEntryPermission.LIST_DIRECTORY
                    );
                    AclEntry.Builder builder = AclEntry.newBuilder();
                    builder.setFlags(flags);
                    builder.setPermissions(permissions);
                    builder.setPrincipal(userPrincipal);
                    builder.setType(AclEntryType.ALLOW);
                    AclEntry entry = builder.build();
                    List<AclEntry> aclEntryList = new ArrayList<>();
                    aclEntryList.add(entry);
                    return aclEntryList;
                }
            };
            if (fileAttributes.value() == null) {
                return false;
            }
            try {
                Files.createDirectories(path, fileAttributes);
                return true;
            } catch (IOException e) {
                log.error("Не удалось создать директорию " + path);
                log.error(Arrays.toString(e.getStackTrace()));
                return false;
            }

        } else {
            try {
                Set<PosixFilePermission> perms = PosixFilePermissions.fromString("rw-rw----");
                FileAttribute<Set<PosixFilePermission>> fileAttribute = PosixFilePermissions.asFileAttribute(perms);
                Files.createDirectories(path, fileAttribute);
                return true;
            } catch (IOException e) {
                log.error("Не удалось создать директорию " + path);
                log.error(Arrays.toString(e.getStackTrace()));
                return false;
            }
        }
    }

    private String createUrl(String relativePath, EFileType type) {
        String tempUrl = relativePath.replaceAll("\\\\", "/");
        if (type.equals(EFileType.IMAGE)) {
            return BASE_URL + "images/" + tempUrl;
        } else {
            return BASE_URL + "doc/" + tempUrl;
        }
    }
}
