import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import type { OnChangeValue } from "react-select";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";
import isNil from "lodash/isNil";
import isNull from "lodash/isNull";
import { zodResolver } from "@hookform/resolvers/zod";

import { ERoutes } from "~/enums";
import { useTheme } from "~/hooks";
import { useFiles, useGetCatalogAlias } from "~/pages/Admin/Products/hooks";
import {
  EFormFields,
  formattedProductAdd,
  formSchema,
  mapProductAddToDto,
} from "~/pages/Admin/Products/ProductAdd";
import type { TForm, TOptionsSubmitForm } from "~/pages/Admin/Products/ProductAdd";
import { getSelectableAttributeOptions } from "~/pages/Admin/Products/utils";
import type { TAttributesByCatalog } from "~/shared/api/attributes";
import type { TCatalogs } from "~/shared/api/catalogs";
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
import { Button, ETypographyVariant, Icon, notify, Typography } from "~/uikit";
import type { isSelectMultiType, TSelectOption } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./ProductAdd.module.css";

type TProps = {
  catalogs: TCatalogs;
};

export const ProductAdd: FC<TProps> = ({ catalogs }) => {
  const { t } = useTranslation();
  const fetcherRemix = useFetcher();
  const { theme } = useTheme();

  const idCheckbox = "checkbox";
  const [defaultImage, setDefaultImage] = useState<TFile | null>(null);
  const [filter, setFilter] = useState<TParams>({ enabled: [idCheckbox] });

  const { catalogAliasesTypeOptions } = useGetCatalogAlias({ catalogs });
  const [catalogAlias, setCatalogAlias] = useState<TSelectOption>(catalogAliasesTypeOptions[0]);
  const attributesByCatalog: TAttributesByCatalog = fetcherRemix.data?.attributesByCatalog;

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

  useEffect(() => {
    if (!isNil(defaultImage) && !isNil(defaultImage.preview)) {
      if (typeof defaultImage.preview === "string") {
        URL.revokeObjectURL(defaultImage.preview);
      }
    }
  }, [defaultImage]);

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    const formattedParams = formattedProductAdd(params);
    const dataFormToDto = mapProductAddToDto(formattedParams);
    console.log("dataFormToDto: ", dataFormToDto);
    const formData = new FormData();
    dataFormToDto.alias && formData.append("alias", dataFormToDto.alias);
    dataFormToDto.catalogAlias && formData.append("catalogAlias", dataFormToDto.catalogAlias);
    dataFormToDto.count && formData.append("count", dataFormToDto.count);
    defaultImage && formData.append("defaultImage", defaultImage);
    dataFormToDto.description && formData.append("description", dataFormToDto.description);
    dataFormToDto.enabled && formData.append("enabled", dataFormToDto.enabled);
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
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AdminProductAdd,
      }),
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    if (isDoneType && !fetcher.data?.success && !fetcher.data?.fieldErrors) {
      notify.error({
        title: "Ошибка выполнения",
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
      <h1 className="ProductAdd-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.productAdd.title")}
        </Typography>
      </h1>

      <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
        <Input label={t("form.alias.title") ?? "Alias"} name={EFormFields.Alias} type="text" />

        <div className="ProductAdd-FormFieldGroup">
          <Select
            defaultValue={catalogAliasesTypeOptions[0]}
            name={EFormFields.CatalogAlias}
            onChange={handleChangeCatalogAlias}
            options={catalogAliasesTypeOptions}
            theme={theme}
          />
        </div>

        <Input
          label={t("form.description.title") ?? "Description"}
          name={EFormFields.Description}
          type="text"
        />

        <div className="ProductAdd-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Enabled].includes(idCheckbox)}
            id={idCheckbox}
            label={t("form.enabled.title") ?? "Enabled"}
            name={EFormFields.Enabled}
            nameGroup="enabled"
            onChange={(event, id, nameGroup) => handleChangeEnabled(event, id, nameGroup)}
          />
        </div>

        <Input label={t("form.name.title") ?? "Name"} name={EFormFields.Name} type="text" />
        <Input label={t("form.count.title") ?? "Count"} name={EFormFields.Count} type="text" />
        <Input label={t("form.price.title") ?? "Price"} name={EFormFields.Price} type="text" />

        <div className="ProductAdd-FormFieldGroup">
          {attributesByCatalog &&
            attributesByCatalog.selectableAttribute &&
            attributesByCatalog.selectableAttribute.map((item) => {
              const { selectableAttributeOptions } = getSelectableAttributeOptions({
                values: item.values ?? [],
              });
              return (
                <div className="ProductAdd-FormFieldGroup" key={item.id}>
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

        <div className="ProductAdd-FormFieldGroup">
          {attributesByCatalog &&
            attributesByCatalog.numberAttribute &&
            attributesByCatalog.numberAttribute.map((item) => {
              return (
                <Input key={item.id} label={item.name} name={item.attributeAlias} type="number" />
              );
            })}
        </div>

        <div className="ProductAdd-FormFieldGroup">
          <div className="ProductAdd-SubTitle">
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

        <div className="ProductAdd-FormFieldGroup">
          <div className="ProductAdd-SubTitle">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              Изображение по умолчанию
            </Typography>
          </div>
          <div className="Previews-Thumb-Inner ProductAdd-DefaultImage">
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

        <div className="ProductAdd-Control">
          <Button className="ProductAdd-Button" type="submit">
            {t("common.actions.create")}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function productAddLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
