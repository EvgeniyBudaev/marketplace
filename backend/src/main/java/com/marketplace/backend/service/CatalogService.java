package com.marketplace.backend.service;


import com.marketplace.backend.dto.catalog.request.RequestPutCatalogDto;
import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.request.RequestUpdateCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.NumberAttributeDto;
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.CatalogMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.EFileType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.service.utils.queryes.QueryParam;
import com.marketplace.backend.service.utils.queryes.processor.QueryProcessor;
import com.marketplace.backend.service.utils.queryes.processor.QueryProcessorImpl;
import com.marketplace.backend.utils.FileUtils;
import com.marketplace.properties.model.properties.GlobalProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CatalogService {
    private final CatalogMapper catalogMapper;
    private final AttributeValueService attributeValueService;
    private final AttributeService attributeService;
    private final GlobalProperty globalProperty;
    private final FileUtils fileUtils;
    private final AdminFilesService adminFilesService;

    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public CatalogService(CatalogMapper catalogMapper, AttributeValueService attributeValueService, AttributeService attributeService, GlobalProperty globalProperty, FileUtils fileUtils, AdminFilesService adminFilesService, EntityManager entityManager) {
        this.catalogMapper = catalogMapper;
        this.attributeValueService = attributeValueService;
        this.attributeService = attributeService;
        this.globalProperty = globalProperty;
        this.fileUtils = fileUtils;
        this.adminFilesService = adminFilesService;
        this.entityManager = entityManager;
    }


    @Transactional(rollbackFor = {OperationNotAllowedException.class})
    public Catalog saveNewCatalog(RequestSaveCatalogDto dto, MultipartFile image) {
        Catalog catalog = catalogMapper.dtoToEntity(dto);
        entityManager.persist(catalog);
        Set<Attribute> attributeList = attributeService.getListAttributeByAliasesWithValue(dto.getAttributeAlias());
        catalog.setAttributes(attributeList);
        attributeList.forEach(x -> x.getCatalog().add(catalog));
        catalog.setEnabled(true);
        catalog.setCreatedAt(LocalDateTime.now());
        catalog.setModifyDate(LocalDateTime.now());
        if(image!=null){
            saveFile(image,EFileType.IMAGE,catalog);
        }
        entityManager.flush();
        entityManager.detach(catalog);
        String imageUrl = catalog.getAlias()+"/"+catalog.getImage();
        catalog.setImage(FileUtils.createUrl(imageUrl,EFileType.IMAGE,globalProperty.getCATALOG_BASE_URL()));
        return catalog;
    }

    @Transactional
    public Catalog putCatalog(RequestPutCatalogDto dto, MultipartFile image) {
        Set<Attribute> newAttributes = attributeService.getListAttributeByAliases(dto.getAttributeAlias());
        Query updateQuery = entityManager
                .createQuery("UPDATE Catalog as c set c.alias = :alias,c.name = :name,c.enabled=true, c.modifyDate = :modify where c.id=:id");
        updateQuery.setParameter("alias", dto.getAlias());
        updateQuery.setParameter("name", dto.getName());
        updateQuery.setParameter("id", dto.getId());
        updateQuery.setParameter("modify", LocalDateTime.now());
        updateQuery.executeUpdate();
        Catalog catalog = findCatalogByAliasWithFullAttributes(dto.getAlias());
        Set<Attribute> oldAttributes = catalog.getAttributes();
        Set<Attribute> attributesForDelete = oldAttributes.stream().filter(x -> !newAttributes.contains(x)).collect(Collectors.toSet());
        Set<Attribute> attributesForAdd = newAttributes.stream().filter(x -> !oldAttributes.contains(x)).collect(Collectors.toSet());
        for (Attribute attribute : attributesForDelete) {
            catalog.removeAttribute(attribute);
        }
        for (Attribute attribute : attributesForAdd) {
            catalog.addAttribute(attribute);
        }
        if(image!=null){
            saveFile(image,EFileType.IMAGE,catalog);
        }
        entityManager.flush();
        entityManager.detach(catalog);
        Set<Attribute> attributeList = attributeService.getListAttributeByAliasesWithValue(dto.getAttributeAlias());
        catalog.setAttributes(attributeList);
        String imageUrl = catalog.getAlias()+"/"+catalog.getImage();
        catalog.setImage(FileUtils.createUrl(imageUrl,EFileType.IMAGE,globalProperty.getCATALOG_BASE_URL()));
        return catalog;
    }

    @Transactional
    public Catalog updateCatalog(RequestUpdateCatalogDto dto) {
        Catalog catalog = catalogMapper.dtoToEntity(dto);
        catalog.setModifyDate(LocalDateTime.now());
        entityManager.merge(catalog);
        entityManager.detach(catalog);
        Catalog newCatalog = findCatalogByAliasWithFullAttributes(dto.getAlias());
        entityManager.detach(newCatalog);
        String imageUrl = newCatalog.getAlias()+"/"+newCatalog.getImage();
        newCatalog.setImage(FileUtils.createUrl(imageUrl,EFileType.IMAGE,globalProperty.getCATALOG_BASE_URL()));
        return newCatalog;
    }

    public Catalog findCatalogByAliasWithFullAttributes(String alias) {
        TypedQuery<Catalog> catalogQuery =
                entityManager.
                        createQuery("SELECT c from Catalog as c where c.alias=:alias", Catalog.class);
        catalogQuery.setParameter("alias", alias);
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("catalog-with-full-attributes");
        catalogQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        return catalogQuery.getResultStream()
                .findFirst().orElseThrow(() -> new ResourceNotFoundException("Не найден каталог с псевдонимом " + alias));
    }

    public Set<NumberAttributeDto> findUseNumericAttributesInCatalog(Catalog catalog) {
        return attributeValueService.findUseNumberAttributesUseInCatalog(catalog.getId());
    }

    public Set<SelectableValue> findUseSelectableAttributesInCatalog(Catalog catalog) {
        return attributeValueService.findUseSelectableAttributesInCatalog(catalog.getId());
    }

    @Transactional
    public Paging<ResponseSimpleCatalogDto> findAll(QueryParam param) {
        QueryProcessor processor = new QueryProcessorImpl(param, Catalog.class);
        TypedQuery<Long> countQuery = entityManager.createQuery(processor.getCountQuery(), Long.class);
        TypedQuery<Catalog> resultQuery = entityManager.createQuery(processor.getMainQuery(), Catalog.class);
        if (param.getSearchString() != null) {
            resultQuery.setParameter("param", param.getSearchString());
            countQuery.setParameter("param", param.getSearchString());
        }
        int count = Math.toIntExact(countQuery.getSingleResult());
        Paging<ResponseSimpleCatalogDto> result = new Paging<>(count, param.getPageSize(), param.getPage());
        if (count == 0) {
            return result;
        }
        resultQuery.setFirstResult((result.getCurrentPage() - 1) * result.getPageSize());
        resultQuery.setMaxResults(result.getPageSize());
        result.setContent(resultQuery.getResultStream()
                .map(x->{
                    ResponseSimpleCatalogDto dto = catalogMapper.entityToSimpleCatalogDto(x);
                    if(dto.getImage()!=null){
                        String imageUrl = dto.getAlias()+"/"+dto.getImage();
                        dto.setImage(FileUtils.createUrl(imageUrl,EFileType.IMAGE,globalProperty.getCATALOG_BASE_URL()));
                    }
                    return dto;
                }).toList());
        return result;
    }

    @Transactional
    public int delete(String alias) {
        TypedQuery<Long> query = entityManager.createQuery("Select count (p) from Product as p  where p.catalog.alias=:alias and p.enabled=true", Long.class);
        query.setParameter("alias", alias);
        Long count = query.getSingleResult();
        if (count > 0) {
            throw new OperationNotAllowedException("Каталог содержит продукты удаление невозможно");
        }
        Query queryDelete = entityManager.createQuery("UPDATE Catalog as c set c.enabled = false where c.alias=:alias and c.enabled=true");
        queryDelete.setParameter("alias", alias);
        return queryDelete.executeUpdate();
    }


    public Set<Attribute> attributesInCatalogByAlias(String alias) {
        TypedQuery<Catalog> resultQuery = entityManager.createQuery("select c from Catalog  as c left join c.attributes where c.enabled=true and c.alias=:alias", Catalog.class);
        resultQuery.setParameter("alias", alias);
        Optional<Catalog> optionalCatalog = resultQuery.getResultStream().findFirst();
        if (optionalCatalog.isPresent()) {
            return optionalCatalog.get().getAttributes();
        }
        throw new ResourceNotFoundException("Не найден каталог с псевдонимом: " + alias);
    }

    public Catalog simpleCatalogByAlias(String alias) {
        TypedQuery<Catalog> resultQuery = entityManager.createQuery("select c from Catalog  as c  where c.enabled=true and c.alias=:alias", Catalog.class);
        resultQuery.setParameter("alias", alias);
        Optional<Catalog> optionalCatalog = resultQuery.getResultStream().findFirst();
        if (optionalCatalog.isPresent()) {
            return optionalCatalog.get();
        }
        throw new ResourceNotFoundException("Не найден каталог с псевдонимом: " + alias);
    }
    public Catalog catalogByAlias(String alias) {
        TypedQuery<Catalog> resultQuery = entityManager.createQuery("select c from Catalog  as c  where c.enabled=true and c.alias=:alias", Catalog.class);
        resultQuery.setParameter("alias", alias);
        Optional<Catalog> optionalCatalog = resultQuery.getResultStream().findFirst();
        if (optionalCatalog.isEmpty()) {
            throw new ResourceNotFoundException("Не найден каталог с псевдонимом: " + alias);
        }
        Catalog catalog = optionalCatalog.get();
        List<String> attributeAliases = catalog.getAttributes().stream().map(Attribute::getAlias).toList();
        Set<Attribute> attributes = attributeService.getListAttributeByAliasesWithValue(attributeAliases);
        entityManager.detach(catalog);
        catalog.setAttributes(attributes);
        if(catalog.getImage()!=null){
            String imageUrl = catalog.getAlias()+"/"+catalog.getImage();
            catalog.setImage(FileUtils.createUrl(imageUrl,EFileType.IMAGE,globalProperty.getCATALOG_BASE_URL()));
        }
        return catalog;
    }
    private void saveFile(MultipartFile uploadFile, EFileType eFileType, Catalog catalog){
        if (eFileType.equals(EFileType.IMAGE) && Boolean.TRUE.equals(globalProperty.getIsCatalogImageDirectoryAvailability())) {
            if (Boolean.TRUE.equals(fileUtils.checkImageFile(uploadFile))) {
                Path imageDir = Path.of(globalProperty.getCATALOG_IMAGE_DIR().toString(), catalog.getId().toString());
                if (!fileUtils.createIfNotExistProductDir(imageDir)) {
                    throw new OperationNotAllowedException("Не удалось создать директорию каталога");
                }
                Path filePath = Path.of(imageDir.toString(), uploadFile.getOriginalFilename());
                if (Boolean.TRUE.equals(adminFilesService.saveFileOnFileSystem(uploadFile,filePath))) {
                    catalog.setImage(uploadFile.getOriginalFilename());
                    return;
                } else {
                    throw new OperationNotAllowedException("Не удалось сохранить файл");
                }
            } else {
                throw new OperationNotAllowedException("Файл не является изображением: " +uploadFile.getOriginalFilename());
            }
        }
        throw new OperationNotAllowedException("Директория для сохранения файла не доступна");
    }
}
