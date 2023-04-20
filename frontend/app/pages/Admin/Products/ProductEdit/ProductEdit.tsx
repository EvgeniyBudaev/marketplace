import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import type { OnChangeValue } from "react-select";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import isNull from "lodash/isNull";
import { ERoutes } from "~/enums";
import { useTheme } from "~/hooks";
import { useGetCatalogAlias } from "~/pages/Admin/Products/hooks";
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
import type { TParams } from "~/types";
import type { isSelectMultiType, TSelectOption } from "~/uikit";
import { Button, ETypographyVariant, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
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

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    console.log("Form params: ", params);
    const formattedParams = formattedProductEdit(params);
    console.log("formattedParams: ", formattedParams);
    const dataFormToDto = mapProductEditToDto(formattedParams, product.id);
    console.log("dataFormToDto : ", dataFormToDto);
    fetcher.submit(dataFormToDto, {
      method: EFormMethods.Put,
      action: createPath({
        route: ERoutes.AdminProductEdit,
        params: { alias: product.alias },
      }),
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
        {/*<div className="ProductAdd-FormFieldGroup">*/}
        {/*  <FileUploader*/}
        {/*      accept={{*/}
        {/*        "image/jpeg": [".jpeg"],*/}
        {/*        "image/png": [".png"],*/}
        {/*      }}*/}
        {/*      files={watchImages}*/}
        {/*      Input={<input hidden name={EFormFields.Images} type="file" />}*/}
        {/*      isLoading={fetcherImagesLoading}*/}
        {/*      maxSize={1024 * 1024}*/}
        {/*      multiple={false}*/}
        {/*      onAddFiles={onAddImages}*/}
        {/*      onDeleteFile={onDeleteImage}*/}
        {/*  />*/}
        {/*</div>*/}
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
