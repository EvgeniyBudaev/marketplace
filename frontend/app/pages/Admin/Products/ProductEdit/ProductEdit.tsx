import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import type { OnChangeValue } from "react-select";
import { useTranslation } from "react-i18next";
import { useAuthenticityToken } from "remix-utils/csrf/react";
import { useFetcher } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import isNil from "lodash/isNil";
import isNull from "lodash/isNull";
import { ERoutes } from "#app/enums";
import { useProxyUrl, useTheme } from "#app/hooks";
import { EAttributeType } from "#app/pages";
import { useFiles, useGetCatalogAlias } from "#app/pages/Admin/Products/hooks";
import {
  EFormFields,
  formattedProductEdit,
  formSchema,
  mapProductEditToDto,
} from "#app/pages/Admin/Products/ProductEdit";
import type {
  TForm,
  TOptionsSubmitForm,
} from "#app/pages/Admin/Products/ProductEdit";
import { getSelectableAttributeOptions } from "#app/pages/Admin/Products/utils";
import type { TAttributesByCatalog } from "#app/shared/api/attributes";
import type { TCatalogs } from "#app/shared/api/catalogs";
import type { TAdminProductDetail } from "#app/shared/api/products";
import {
  Checkbox,
  EFormMethods,
  FileUploader,
  Form,
  Input,
  Select,
  useInitForm,
} from "#app/shared/form";
import type { TDomainErrors, TFile, TParams } from "#app/types";
import type { isSelectMultiType, TSelectOption } from "#app/uikit";
import {
  Button,
  ETypographyVariant,
  Icon,
  notify,
  Tooltip,
  Typography,
} from "#app/uikit";
import { createPath } from "#app/utils";
import styles from "./ProductEdit.css";

type TProps = {
  attributesByCatalog: TAttributesByCatalog;
  catalogs: TCatalogs;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  product: TAdminProductDetail;
  success?: boolean;
};

export const ProductEdit: FC<TProps> = (props) => {
  const csrf = useAuthenticityToken();
  const { proxyUrl } = useProxyUrl();
  const { t } = useTranslation();
  const fetcherRemix = useFetcher();
  const { theme } = useTheme();
  const idCheckbox = "enabled";

  const attributesByCatalog: TAttributesByCatalog =
    fetcherRemix.data?.attributesByCatalog ?? props.attributesByCatalog;
  const catalogs: TCatalogs = fetcherRemix.data?.catalogs ?? props.catalogs;
  const product: TAdminProductDetail =
    fetcherRemix.data?.product ?? props.product;

  const [defaultImage, setDefaultImage] = useState<TFile | string | null>(
    product?.defaultImage ?? null
  );
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [filter, setFilter] = useState<TParams>({
    enabled: product.enabled ? [idCheckbox] : [],
  });

  const { catalogAliasesTypeOptions } = useGetCatalogAlias({ catalogs });
  const defaultCatalogAlias = catalogAliasesTypeOptions.find(
    (item) => item.value === product.catalogAlias
  );
  const productSelectableAttributeList = product.attributeValuesSet.filter(
    (item) => item.attributeType === EAttributeType.Selectable
  );
  const productNumberAttributeList = product.attributeValuesSet.filter(
    (item) => item.attributeType === EAttributeType.Double
  );

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isLoading = fetcherRemix.state !== "idle";
  const isDoneType = form.isDoneType;
  const { setValue, watch } = form.methods;

  const watchFiles = watch(EFormFields.Files);
  const { onAddFiles, onDeleteFile, fetcherFilesLoading } = useFiles({
    fieldName: EFormFields.Files,
    files: watchFiles,
    setValue,
  });

  useEffect(() => {
    setDefaultImage(product.defaultImage ?? null);
    setImages(product.images ?? []);
  }, [product, catalogs, product.enabled]);

  const handleChangeEnabled = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    nameGroup: string
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
    selectedOption: OnChangeValue<TSelectOption, isSelectMultiType>
  ) => {
    if (isNull(selectedOption)) return;
  };

  const handleAddFileToDefaultImage = (value: TFile | string) => {
    setDefaultImage(value);
  };

  const handleDeleteDefaultImage = (value: TFile | string) => {
    if (typeof defaultImage !== "string" && typeof value !== "string") {
      if (value.name === defaultImage?.name) {
        setDefaultImage(null);
      }
    }
    if (typeof defaultImage === "string" && typeof value === "string") {
      if (value === defaultImage) {
        setDefaultImage(null);
      }
    }
  };

  const handleDeleteImage = (image: string) => {
    setImages((prevState) => {
      const idx = prevState.findIndex((item) => item === image);
      return [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];
    });
    handleDeleteDefaultImage(image);
  };

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    if (typeof defaultImage === "string") {
      return;
    }
    onDeleteFile(file, files);
    handleDeleteDefaultImage(file);
  };

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    const formattedParams = formattedProductEdit(params);
    const dataFormToDto = mapProductEditToDto(
      formattedParams,
      product.id,
      attributesByCatalog?.alias
    );
    console.log("dataFormToDto: ", dataFormToDto);
    const formData = new FormData();
    dataFormToDto.alias && formData.append("alias", dataFormToDto.alias);
    dataFormToDto.catalogAlias &&
      formData.append("catalogAlias", dataFormToDto.catalogAlias);
    dataFormToDto.count && formData.append("count", dataFormToDto.count);
    defaultImage && formData.append("defaultImage", defaultImage);
    dataFormToDto.description &&
      formData.append("description", dataFormToDto.description);
    dataFormToDto.enabled && formData.append("enabled", dataFormToDto.enabled);
    dataFormToDto.id && formData.append("id", dataFormToDto.id);
    images && images.forEach((image) => formData.append("images[]", image));
    dataFormToDto.files &&
      dataFormToDto.files.forEach((file) => formData.append("files", file));
    dataFormToDto.name && formData.append("name", dataFormToDto.name);
    if (dataFormToDto.numericValues) {
      for (let i = 0; i < dataFormToDto.numericValues.length; i++) {
        formData.append(
          `numericValues[${i}].attributeAlias`,
          dataFormToDto.numericValues[i].attributeAlias
        );
        formData.append(
          `numericValues[${i}].value`,
          dataFormToDto.numericValues[i].value.toString()
        );
      }
    }
    dataFormToDto.price && formData.append("price", dataFormToDto.price);
    dataFormToDto.selectableValues &&
      dataFormToDto.selectableValues.forEach((item) =>
        formData.append("selectableValues[]", item.toString())
      );
    formData.append("csrf", csrf);

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
    if (isDoneType && !props.success && !props.fieldErrors) {
      notify.error({
        title: "Ошибка выполнения",
      });
    }
    if (isDoneType && props.success && !props.fieldErrors) {
      notify.success({
        title: "Обновлено",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.success, isDoneType]);

  return (
    <section>
      <h1 className="ProductEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.productEdit.title")}
        </Typography>
      </h1>

      <Form<TForm>
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Put}
      >
        <Input
          defaultValue={product.alias}
          label={t("form.alias.title") ?? "Alias"}
          name={EFormFields.Alias}
          type="text"
        />

        <div className="ProductEdit-FormFieldGroup">
          <Select
            defaultValue={defaultCatalogAlias ?? catalogAliasesTypeOptions[0]}
            isDisabled={true}
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
            onChange={(event, id, nameGroup) =>
              handleChangeEnabled(event, id, nameGroup)
            }
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
          {!isLoading &&
            attributesByCatalog &&
            attributesByCatalog.selectableAttribute &&
            productSelectableAttributeList &&
            attributesByCatalog.selectableAttribute.map((item) => {
              const { selectableAttributeOptions } =
                getSelectableAttributeOptions({
                  values: item.values ?? [],
                });
              const defaultAttribute = productSelectableAttributeList.find(
                (attribute) => attribute.attributeAlias === item.alias
              );
              const defaultValue = {
                value: defaultAttribute?.id.toString() ?? "",
                label: defaultAttribute?.value ?? "",
              };
              return (
                <div className="ProductEdit-FormFieldGroup" key={item.id}>
                  <Select
                    defaultValue={defaultValue}
                    name={item.alias}
                    options={selectableAttributeOptions}
                    theme={theme}
                  />
                </div>
              );
            })}
        </div>

        <div className="ProductEdit-FormFieldGroup">
          {!isLoading &&
            productNumberAttributeList &&
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

        <div className="ProductEdit-FormFieldGroup">
          <div className="ProductEdit-SubTitle">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              Текущие изображения в галлереи
            </Typography>
          </div>
          <div className="Previews">
            {!isNil(images) &&
              images.map((image, index) => (
                <div className="Previews-Thumb" key={`${image}-${index}`}>
                  <div className="Previews-Thumb-Inner">
                    <img
                      alt={image}
                      className="Previews-Thumb-Image"
                      src={`${proxyUrl}${image}`}
                    />
                  </div>
                  <div className="Previews-File">
                    <div className="Previews-File-Inner">
                      <div className="Previews-File-IconWrapper">
                        <Icon
                          className="Previews-File-ImageIcon"
                          type="Image"
                        />
                      </div>
                      <div className="Previews-File-Name">{image}</div>
                    </div>
                    <div className="Previews-File-IconWrapper">
                      <Tooltip
                        message={t("pages.admin.productEdit.addDefaultImage")}
                      >
                        <Icon
                          className="Previews-File-AddIcon"
                          onClick={() => handleAddFileToDefaultImage(image)}
                          type="AddCircleOutline"
                        />
                      </Tooltip>
                      <Tooltip
                        message={t("pages.admin.productEdit.deleteImage")}
                      >
                        <Icon
                          className="Previews-File-TrashIcon"
                          onClick={() => handleDeleteImage(image)}
                          type="Trash"
                        />
                      </Tooltip>
                    </div>
                  </div>
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
              {t("pages.admin.product.previews.addImage")}
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
              {t("pages.admin.product.previews.defaultImage")}
            </Typography>
          </div>
          <div className="Previews-Thumb-Inner ProductEdit-DefaultImage">
            {!isNil(defaultImage) && typeof defaultImage !== "string" && (
              <>
                {!isNil(defaultImage.preview) && (
                  <img
                    alt={defaultImage.name}
                    className="Previews-Thumb-Image"
                    src={defaultImage.preview}
                  />
                )}
              </>
            )}
            {!isNil(defaultImage) && typeof defaultImage === "string" && (
              <img
                alt={product.name}
                className="Previews-Thumb-Image"
                src={`${proxyUrl}${defaultImage}`}
              />
            )}
          </div>
          <div className="Previews-File">
            <div className="Previews-File-Inner">
              <div className="Previews-File-IconWrapper">
                <Icon className="Previews-File-ImageIcon" type="Image" />
              </div>
              <div className="Previews-File-Name">
                {typeof defaultImage !== "string"
                  ? defaultImage?.name
                  : defaultImage}
              </div>
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
