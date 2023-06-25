import isNil from "lodash/isNil";
import {useEffect, useState} from "react";
import type {FC, ChangeEvent} from "react";
import {useTranslation} from "react-i18next";
import {useAuthenticityToken} from "remix-utils";
import {zodResolver} from "@hookform/resolvers/zod";

import {ERoutes} from "~/enums";
import {useTheme} from "~/hooks";
import {useGetAttributeOptions} from "~/pages/Admin/Catalogs/hooks";
import {
  EFormFields,
  formSchema,
  mapCatalogAddFormDataToDto,
} from "~/pages/Admin/Catalogs/CatalogAdd";
import type {TForm, TOptionsSubmitForm} from "~/pages/Admin/Catalogs/CatalogAdd";
import {useFiles} from "~/pages/Admin/Products/hooks";
import type {TAttributes} from "~/shared/api/attributes";
import {Checkbox, EFormMethods, FileUploader, Form, Input, Select, useInitForm} from "~/shared/form";
import type {TDomainErrors, TFile, TParams} from "~/types";
import {Button, ETypographyVariant, Icon, notify, Typography} from "~/uikit";
import {createPath} from "~/utils";
import styles from "./CatalogAdd.css";

type TProps = {
  attributes: TAttributes;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success: boolean;
};

export const CatalogAdd: FC<TProps> = (props) => {
  const {attributes} = props;
  const csrf = useAuthenticityToken();
  const {t} = useTranslation();
  const {theme} = useTheme();

  const idCheckbox = "checkbox";
  const [defaultImage, setDefaultImage] = useState<TFile | null>(null);
  const [filter, setFilter] = useState<TParams>({enabled: [idCheckbox]});

  const {attributeOptions} = useGetAttributeOptions({attributes});

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const {setValue, watch} = form.methods;

  const watchFiles = watch(EFormFields.Image);
  const {onAddFiles, onDeleteFile, fetcherFilesLoading} = useFiles({
    fieldName: EFormFields.Image,
    files: watchFiles,
    setValue,
  });

  useEffect(() => {
    if (!isNil(defaultImage) && !isNil(defaultImage.preview)) {
      if (typeof defaultImage.preview === "string") {
        URL.revokeObjectURL(defaultImage.preview);
      }
    }
  }, [defaultImage]);

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
    nameGroup: string,
  ) => {
    const {
      target: {checked, value},
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

  const handleSubmit = (params: TParams, {fetcher}: TOptionsSubmitForm) => {
    const dataFormToDto = mapCatalogAddFormDataToDto({
      ...params,
      attributeAlias: params.attributeAlias,
    });
    const formData = new FormData();
    dataFormToDto.alias && formData.append("alias", dataFormToDto.alias);
    dataFormToDto.attributeAlias &&
    dataFormToDto.attributeAlias.forEach((item) =>
      formData.append("attributeAlias", item.value),
    );
    dataFormToDto.enabled && formData.append("enabled", dataFormToDto.enabled);
    defaultImage && formData.append("image", defaultImage);
    dataFormToDto.name && formData.append("name", dataFormToDto.name);
    formData.append("csrf", csrf);
    // console.log("dataFormToDto: ", dataFormToDto);
    fetcher.submit(formData, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AdminCatalogAdd,
      }),
      encType: "multipart/form-data",
    });
  };

  return (
    <section>
      <h1 className="CatalogAdd-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.catalogAdd.title")}
        </Typography>
      </h1>
      <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
        <Input label={t("form.alias.title") ?? "Alias"} name={EFormFields.Alias} type="text"/>
        <div className="CatalogAdd-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Enabled].includes(idCheckbox)}
            id={idCheckbox}
            label={t("form.enabled.title") ?? "Enabled"}
            name={EFormFields.Enabled}
            nameGroup="enabled"
            onChange={(event, id, nameGroup) => handleChangeEnabled(event, id, nameGroup)}
          />
        </div>
        <Input label={t("form.name.title") ?? "Name"} name={EFormFields.Name} type="text"/>
        <div className="CatalogAdd-FormFieldGroup">
          <Select
            defaultValue={[attributeOptions[0]]}
            isMulti={true}
            name={EFormFields.AttributeAlias}
            options={attributeOptions}
            theme={theme}
          />
        </div>

        <div className="CatalogAdd-FormFieldGroup">
          <div className="CatalogAdd-SubTitle">
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
            Input={<input hidden name={EFormFields.Image} type="file"/>}
            isLoading={fetcherFilesLoading}
            maxFiles={1}
            maxSize={1024 * 1024}
            multiple={false}
            onAddFile={handleAddFileToDefaultImage}
            onAddFiles={onAddFiles}
            onDeleteFile={handleDeleteFile}
          />
        </div>

        <div className="CatalogAdd-FormFieldGroup">
          <div className="CatalogAdd-SubTitle">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("pages.admin.product.previews.defaultImage")}
            </Typography>
          </div>
          <div className="Previews-Thumb-Inner CatalogAdd-DefaultImage">
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
                <Icon className="Previews-File-ImageIcon" type="Image"/>
              </div>
              <div className="Previews-File-Name">{defaultImage?.name}</div>
            </div>
          </div>
        </div>

        <div className="CatalogAdd-Control">
          <Button className="CatalogAdd-Button" type="submit">
            {t("common.actions.create")}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function catalogAddLinks() {
  return [{rel: "stylesheet", href: styles}];
}
