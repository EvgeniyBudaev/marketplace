import isNil from "lodash/isNil";
import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuthenticityToken } from "remix-utils/csrf/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "#app/enums";
import { useProxyUrl, useTheme } from "#app/hooks";
import {
  useGetAttributeByCatalogOptions,
  useGetAttributeOptions,
} from "#app/pages/Admin/Catalogs/hooks";
import {
  EFormFields,
  formSchema,
  mapCatalogEditToDto,
} from "#app/pages/Admin/Catalogs/CatalogEdit";
import type {
  TForm,
  TOptionsSubmitForm,
} from "#app/pages/Admin/Catalogs/CatalogEdit";
import { useFiles } from "#app/pages/Admin/Products/hooks";
import type {
  TAttributes,
  TAttributesByCatalog,
} from "#app/shared/api/attributes";
import type { TCatalogDetail } from "#app/shared/api/catalogs";
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
import {
  Button,
  ETypographyVariant,
  Icon,
  notify,
  Typography,
} from "#app/uikit";
import { createPath } from "#app/utils";
import styles from "./CatalogEdit.css";

type TProps = {
  attributes: TAttributes;
  attributesByCatalog: TAttributesByCatalog;
  catalog: TCatalogDetail;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success?: boolean;
};

export const CatalogEdit: FC<TProps> = (props) => {
  const csrf = useAuthenticityToken();
  const { proxyUrl } = useProxyUrl();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [attributes, setAttributes] = useState(props.attributes);
  const [attributesByCatalog, setAttributesByCatalog] = useState(
    props.attributesByCatalog
  );
  const [catalog, setCatalog] = useState(props.catalog);
  const [defaultImage, setDefaultImage] = useState<TFile | string | null>(
    props.catalog?.image ?? null
  );
  const idCheckbox = "enabled";
  const [filter, setFilter] = useState<TParams>({
    enabled: props.catalog?.enabled ? [idCheckbox] : [],
  });
  const enabled: boolean = filter[EFormFields.Enabled].includes(idCheckbox);

  const { attributeOptions } = useGetAttributeOptions({ attributes });
  const { attributeByCatalogOptions } = useGetAttributeByCatalogOptions({
    attributesByCatalog,
  });

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const { setValue, watch } = form.methods;

  const watchFiles = watch(EFormFields.Image);
  const { onAddFiles, onDeleteFile, fetcherFilesLoading } = useFiles({
    fieldName: EFormFields.Image,
    files: watchFiles,
    setValue,
  });

  useEffect(() => {
    setAttributes(props.attributes);
    setAttributesByCatalog(props.attributesByCatalog);
    setCatalog(props.catalog);
    setDefaultImage(props.catalog.image ?? null);
  }, [props.attributes, props.attributesByCatalog, props.catalog]);

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

  const handleAddFileToDefaultImage = (value: TFile | string) => {
    setDefaultImage(value);
  };

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    if (typeof defaultImage === "string") {
      return;
    }
    onDeleteFile(file, files);
  };

  const handleLoadImage = (file: TFile) => {
    return file?.preview ? URL.revokeObjectURL(file.preview) : file;
  };

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    const dataFormToDto = mapCatalogEditToDto(params, catalog.id, enabled);
    const formData = new FormData();
    dataFormToDto.alias && formData.append("alias", dataFormToDto.alias);
    dataFormToDto.attributeAlias &&
      dataFormToDto.attributeAlias.forEach((item) =>
        formData.append("attributeAlias", item.value)
      );
    dataFormToDto.enabled && formData.append("enabled", dataFormToDto.enabled);
    dataFormToDto.id && formData.append("id", dataFormToDto.id);
    defaultImage && formData.append("image", defaultImage);
    dataFormToDto.name && formData.append("name", dataFormToDto.name);
    formData.append("csrf", csrf);
    fetcher.submit(formData, {
      method: EFormMethods.Put,
      action: createPath({
        route: ERoutes.AdminCatalogEdit,
        params: { alias: catalog.alias },
      }),
      encType: "multipart/form-data",
    });
  };

  return (
    <section>
      <h1 className="CatalogEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.catalogEdit.title")}
        </Typography>
      </h1>
      <Form<TForm>
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Post}
      >
        <Input
          defaultValue={catalog.alias}
          label={t("form.alias.title") ?? "Alias"}
          name={EFormFields.Alias}
          type="text"
        />
        <div className="CatalogEdit-FormFieldGroup">
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
          defaultValue={catalog.name}
          label={t("form.name.title") ?? "Name"}
          name={EFormFields.Name}
          type="text"
        />
        <div className="CatalogEdit-FormFieldGroup">
          <Select
            defaultValue={attributeByCatalogOptions}
            isMulti={true}
            name={EFormFields.AttributeAlias}
            options={attributeOptions}
            theme={theme}
          />
        </div>
        <div className="CatalogEdit-FormFieldGroup">
          <div className="CatalogEdit-SubTitle">
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
            Input={<input hidden name={EFormFields.Image} type="file" />}
            isLoading={fetcherFilesLoading}
            maxFiles={1}
            maxSize={1024 * 1024}
            multiple={false}
            onAddFile={handleAddFileToDefaultImage}
            onAddFiles={onAddFiles}
            onDeleteFile={handleDeleteFile}
          />
        </div>

        <div className="CatalogEdit-FormFieldGroup">
          <div className="CatalogEdit-SubTitle">
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
                    src={`${proxyUrl}${defaultImage.preview}`}
                    onLoad={() => handleLoadImage(defaultImage)}
                  />
                )}
              </>
            )}
            {!isNil(defaultImage) && typeof defaultImage === "string" && (
              <img
                alt={catalog.name}
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

        <div className="CatalogEdit-Control">
          <Button className="CatalogEdit-Button" type="submit">
            {t("common.actions.save")}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function catalogEditLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
