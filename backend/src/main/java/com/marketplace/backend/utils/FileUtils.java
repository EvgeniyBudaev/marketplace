package com.marketplace.backend.utils;

import com.marketplace.backend.model.EFileType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.*;
import java.util.*;
import java.util.zip.Deflater;
import java.util.zip.Inflater;
@Component
@Slf4j
public class FileUtils {
    public static byte[] compressImage(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4 * 1024];
        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }
        try {
            outputStream.close();
        } catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }


    public static byte[] decompressImage(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4 * 1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        } catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }
    public static String createUrl(String relativePath, EFileType type, String baseUrl) {
        String tempUrl = relativePath.replaceAll("\\\\", "/");
        if (type.equals(EFileType.IMAGE)) {
            return baseUrl + "images/" + tempUrl;
        } else {
            return baseUrl + "doc/" + tempUrl;
        }
    }
    public boolean createIfNotExistProductDir(Path path) {
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

    public Boolean checkImageFile(MultipartFile file) {
        String mimetype = file.getContentType();
        if (mimetype == null) {
            return false;
        }
        String[] type = mimetype.split("/");
        return type[0].equals("image");
    }
}
