import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import type { OnChangeValue } from "react-select";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import isNil from "lodash/isNil";
import isNull from "lodash/isNull";
import { ERoutes } from "~/enums";
import { useTheme } from "~/hooks";
import { useFiles, useGetCatalogAlias } from "~/pages/Admin/Products/hooks";
import {
  EFormFields,
  formattedProductEdit,
  formSchema,
  mapProductEditToDto,
} from "~/pages/Admin/Products/ProductEdit";
import type { TForm, TOptionsSubmitForm } from "~/pages/Admin/Products/ProductEdit";
import { getSelectableAttributeOptions } from "~/pages/Admin/Products/utils";
import type { TAttributesByCatalog } from "~/shared/api/attributes";
import type { TCatalogs } from "~/shared/api/catalogs";
import type { TAdminProductDetail } from "~/shared/api/products";
import {
  Checkbox,
  EFormMethods,
  FileUploader,
  Form,
  Input,
  Select,
  useInitForm,
} from "~/shared/form";
import type { TFile, TParams } from "~/types";
import type { isSelectMultiType, TSelectOption } from "~/uikit";
import { Button, ETypographyVariant, Icon, notify, Typography } from "~/uikit";
import { createPath, formatProxy } from "~/utils";
import styles from "./ProductEdit.module.css";

type TProps = {
  catalogs: TCatalogs;
  product: TAdminProductDetail;
};

export const ProductEdit: FC<TProps> = ({ catalogs, product }) => {
  const { t } = useTranslation();
  const fetcherRemix = useFetcher();
  const { theme } = useTheme();
  console.log("product: ", product);

  const idCheckbox = "enabled";

  const [defaultImage, setDefaultImage] = useState<TFile | null>(null);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [filter, setFilter] = useState<TParams>({ enabled: product.enabled ? [idCheckbox] : [] });

  const { catalogAliasesTypeOptions } = useGetCatalogAlias({ catalogs });
  const defaultCatalogAlias = catalogAliasesTypeOptions.find(
    (item) => item.value === product.catalogAlias,
  );
  const [catalogAlias, setCatalogAlias] = useState<TSelectOption>(
    defaultCatalogAlias ?? catalogAliasesTypeOptions[0],
  );
  const attributesByCatalog: TAttributesByCatalog = fetcherRemix.data?.attributesByCatalog;

  const productSelectableAttributeList = product.attributeValuesSet.filter(
    (item) => item.attributeType === "SELECTABLE",
  );
  const productNumberAttributeList = product.attributeValuesSet.filter(
    (item) => item.attributeType === "DOUBLE",
  );

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const fetcher = form.fetcher;
  const { setValue, watch } = form.methods;

  const watchFiles = watch(EFormFields.Files);
  const { onAddFiles, onDeleteFile, fetcherFilesLoading } = useFiles({
    fieldName: EFormFields.Files,
    files: watchFiles,
    setValue,
  });

  const handleChangeEnabled = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    nameGroup: string,
  ) => {
    const {
      target: { checked, value },
    } = event;

    if (checked) {
      setFilter({
        ...filter,
        [nameGroup]: [...filter[nameGroup], value],
      });
    } else {
      setFilter({
        ...filter,
        [nameGroup]: [...filter[nameGroup].filter((x: string) => x !== value)],
      });
    }
  };

  const handleChangeCatalogAlias = (
    selectedOption: OnChangeValue<TSelectOption, isSelectMultiType>,
  ) => {
    if (isNull(selectedOption)) return;
    setCatalogAlias(selectedOption as TSelectOption);
  };

  const handleDeleteImage = (image: string) => {
    setImages((prevState) => {
      const idx = prevState.findIndex((item) => item === image);
      return [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];
    });
  };

  const handleAddFileToDefaultImage = (file: TFile) => {
    setDefaultImage(file);
  };

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    onDeleteFile(file, files);
    if (file.name === defaultImage?.name) {
      setDefaultImage(null);
    }
  };

  const handleLoadImage = (file: TFile) => {
    return file?.preview ? URL.revokeObjectURL(file.preview) : file;
  };

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    const formattedParams = formattedProductEdit(params);
    const dataFormToDto = mapProductEditToDto(formattedParams, product.id);
    // console.log("formattedParams: ", formattedParams);
    // console.log("Form params: ", params);
    // console.log("dataFormToDto : ", dataFormToDto);
    const formData = new FormData();
    dataFormToDto.alias && formData.append("alias", dataFormToDto.alias);
    dataFormToDto.catalogAlias && formData.append("catalogAlias", dataFormToDto.catalogAlias);
    dataFormToDto.count && formData.append("count", dataFormToDto.count);
    defaultImage && formData.append("defaultImage", defaultImage);
    dataFormToDto.description && formData.append("description", dataFormToDto.description);
    dataFormToDto.enabled && formData.append("enabled", dataFormToDto.enabled);
    dataFormToDto.id && formData.append("id", dataFormToDto.id);
    images && images.forEach((image) => formData.append("images[]", image));
    dataFormToDto.files && dataFormToDto.files.forEach((file) => formData.append("files", file));
    dataFormToDto.name && formData.append("name", dataFormToDto.name);
    if (dataFormToDto.numericValues) {
      for (let i = 0; i < dataFormToDto.numericValues.length; i++) {
        formData.append(
          `numericValues[${i}].attributeAlias`,
          dataFormToDto.numericValues[i].attributeAlias,
        );
        formData.append(
          `numericValues[${i}].value`,
          dataFormToDto.numericValues[i].value.toString(),
        );
      }
    }
    dataFormToDto.price && formData.append("price", dataFormToDto.price);
    dataFormToDto.selectableValues &&
      dataFormToDto.selectableValues.forEach((item) =>
        formData.append("selectableValues[]", item.toString()),
      );

    fetcher.submit(formData, {
      method: EFormMethods.Put,
      action: createPath({
        route: ERoutes.AdminProductEdit,
        params: { alias: product.alias },
      }),
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    console.log("isDoneType: ", isDoneType);
    console.log("success: ", fetcher.data?.success);
    if (isDoneType && !fetcher.data?.success && !fetcher.data?.fieldErrors) {
      notify.error({
        title: "Ошибка выполнения",
      });
    }
    if (isDoneType && fetcher.data?.success && !fetcher.data?.fieldErrors) {
      notify.success({
        title: "Обновлено",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, fetcher.data?.success, isDoneType]);

  useEffect(() => {
    fetcherRemix.submit(
      {},
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.ResourcesAttributesByCatalog,
          params: { alias: catalogAlias.value },
        }),
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogAlias]);

  return (
    <section>
      <h1 className="ProductEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.productEdit.title")}
        </Typography>
      </h1>

      <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Put}>
        <Input
          defaultValue={product.alias}
          label={t("form.alias.title") ?? "Alias"}
          name={EFormFields.Alias}
          type="text"
        />

        <div className="ProductEdit-FormFieldGroup">
          <Select
            defaultValue={defaultCatalogAlias ?? catalogAliasesTypeOptions[0]}
            name={EFormFields.CatalogAlias}
            onChange={handleChangeCatalogAlias}
            options={catalogAliasesTypeOptions}
            theme={theme}
          />
        </div>

        <Input
          defaultValue={product?.description ?? ""}
          label={t("form.description.title") ?? "Description"}
          name={EFormFields.Description}
          type="text"
        />

        <div className="ProductEdit-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Enabled].includes(idCheckbox)}
            id={idCheckbox}
            label={t("form.enabled.title") ?? "Enabled"}
            name={EFormFields.Enabled}
            nameGroup="enabled"
            onChange={(event, id, nameGroup) => handleChangeEnabled(event, id, nameGroup)}
          />
        </div>

        <Input
          defaultValue={product.name}
          label={t("form.name.title") ?? "Name"}
          name={EFormFields.Name}
          type="text"
        />
        <Input
          defaultValue={product.count}
          label={t("form.count.title") ?? "Count"}
          name={EFormFields.Count}
          type="text"
        />
        <Input
          defaultValue={product.price}
          label={t("form.price.title") ?? "Price"}
          name={EFormFields.Price}
          type="text"
        />

        <div className="ProductEdit-FormFieldGroup">
          {attributesByCatalog &&
            attributesByCatalog.selectableAttribute &&
            productSelectableAttributeList &&
            attributesByCatalog.selectableAttribute.map((item) => {
              const { selectableAttributeOptions } = getSelectableAttributeOptions({
                values: item.values ?? [],
              });
              return (
                <div className="ProductEdit-FormFieldGroup" key={item.id}>
                  <Select
                    defaultValue={selectableAttributeOptions[0]}
                    name={item.alias}
                    options={selectableAttributeOptions}
                    theme={theme}
                  />
                </div>
              );
            })}
        </div>

        <div className="ProductEdit-FormFieldGroup">
          {productNumberAttributeList &&
            productNumberAttributeList.map((item) => {
              return (
                <Input
                  defaultValue={item.value}
                  key={item.id}
                  label={item.attributeName}
                  name={item.attributeAlias}
                  type="number"
                />
              );
            })}
        </div>

        {/*<div className="ProductEdit-FormFieldGroup">*/}
        {/*  <div className="ProductEdit-ImageList">*/}
        {/*    <div className="ProductEdit-ImageListItem">*/}
        {/*      <img*/}
        {/*        alt={defaultImages[0]}*/}
        {/*        className="ProductEdit-ImageListItem-Image"*/}
        {/*        src={formatProxy(defaultImages[0])}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="ProductEdit-FormFieldGroup">
          <div className="ProductEdit-SubTitle">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              Текущие изображения в галлереи
            </Typography>
          </div>
          <div className="ProductEdit-ImageList">
            {!isNil(images) &&
              images.map((image, index) => (
                <div className="ProductEdit-ImageListItem" key={`${image}-${index}`}>
                  <Icon
                    className="ProductEdit-ImageListItem-Icon"
                    onClick={() => handleDeleteImage(image)}
                    type="Close"
                  />
                  <img
                    alt={image}
                    className="ProductEdit-ImageListItem-Image"
                    src={formatProxy(image)}
                  />
                </div>
              ))}
          </div>
          <div className="ProductEdit-Hidden">
            {!isNil(product.images) && (
              <Input
                defaultValue={JSON.stringify(product.images)}
                name={EFormFields.Images}
                type="hidden"
              />
            )}
          </div>
        </div>

        <div className="ProductEdit-FormFieldGroup">
          <div className="ProductEdit-SubTitle">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              Добавить новое изображение в галлерею
            </Typography>
          </div>
          <FileUploader
            accept={{
              "image/jpeg": [".jpeg"],
              "image/png": [".png"],
            }}
            files={watchFiles}
            Input={<input hidden name={EFormFields.Files} type="file" />}
            isLoading={fetcherFilesLoading}
            maxSize={1024 * 1024}
            multiple={false}
            onAddFile={handleAddFileToDefaultImage}
            onAddFiles={onAddFiles}
            onDeleteFile={handleDeleteFile}
          />
        </div>

        <div className="ProductEdit-FormFieldGroup">
          <div className="ProductEdit-SubTitle">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              Изображение по умолчанию
            </Typography>
          </div>
          <div className="Previews-Thumb-Inner ProductEdit-DefaultImage">
            {!isNil(defaultImage) && !isNil(defaultImage.preview) && (
              <img
                alt={defaultImage.name}
                className="Previews-Thumb-Image"
                src={defaultImage.preview}
                onLoad={() => handleLoadImage(defaultImage)}
              />
            )}
          </div>
          <div className="Previews-File">
            <div className="Previews-File-Inner">
              <div className="Previews-File-IconWrapper">
                <Icon className="Previews-File-ImageIcon" type="Image" />
              </div>
              <div className="Previews-File-Name">{defaultImage?.name}</div>
            </div>
          </div>
        </div>

        <div className="ProductEdit-Control">
          <Button className="ProductEdit-Button" type="submit">
            {t("common.actions.save")}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function productEditLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
