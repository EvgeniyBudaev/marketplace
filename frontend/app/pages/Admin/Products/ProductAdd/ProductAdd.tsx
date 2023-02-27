import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import type { OnChangeValue } from "react-select";
import { useFetcher } from "@remix-run/react";
import isNull from "lodash/isNull";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes, ETheme } from "~/enums";
import { useSettings } from "~/hooks";
import { useGetCatalogAlias } from "~/pages/Admin/Products/hooks";
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
import { Checkbox, EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, notify, Typography } from "~/uikit";
import type { isSelectMultiType, TSelectOption } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./ProductAdd.module.css";

type TProps = {
  catalogs: TCatalogs;
};

export const ProductAdd: FC<TProps> = ({ catalogs }) => {
  const fetcherRemix = useFetcher();
  const settings = useSettings();
  const theme = settings.settings.theme;

  const idCheckbox = "checkbox";
  const [filter, setFilter] = useState<TParams>({ enabled: [idCheckbox] });

  const { catalogAliasesTypeOptions } = useGetCatalogAlias({ catalogs });
  const [catalogAlias, setCatalogAlias] = useState<TSelectOption>(catalogAliasesTypeOptions[0]);
  const attributesByCatalog: TAttributesByCatalog = fetcherRemix.data?.attributesByCatalog;

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
    const formattedParams = formattedProductAdd(params);
    console.log("formattedParams: ", formattedParams);
    const dataFormToDto = mapProductAddToDto(formattedParams);
    console.log("dataFormToDto : ", dataFormToDto);
    fetcher.submit(dataFormToDto, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AdminProductAdd,
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
      <h1 className="ProductAdd-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Добавление продукта</Typography>
      </h1>
      <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
        <Input label="Alias" name={EFormFields.Alias} type="text" />
        <div className="ProductAdd-FormFieldGroup">
          <Select
            defaultValue={catalogAliasesTypeOptions[0]}
            name={EFormFields.CatalogAlias}
            onChange={handleChangeCatalogAlias}
            options={catalogAliasesTypeOptions}
            theme={theme === ETheme.Light ? "primary" : "secondary"}
          />
        </div>
        <Input label="Description" name={EFormFields.Description} type="text" />
        <div className="ProductAdd-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Enabled].includes(idCheckbox)}
            id={idCheckbox}
            label={"enabled"}
            name={EFormFields.Enabled}
            nameGroup={"enabled"}
            onChange={(event, id, nameGroup) => handleChangeEnabled(event, id, nameGroup)}
          />
        </div>
        <Input label="Name" name={EFormFields.Name} type="text" />
        <Input label="Count" name={EFormFields.Count} type="text" />
        <Input label="Price" name={EFormFields.Price} type="text" />
        <div className="ProductAdd-FormFieldGroup">
          {attributesByCatalog &&
            attributesByCatalog.selectableAttribute &&
            attributesByCatalog.selectableAttribute.map((item) => {
              const { selectableAttributeOptions } = getSelectableAttributeOptions({
                values: item.values,
              });
              return (
                <div className="ProductAdd-FormFieldGroup" key={item.id}>
                  <Select
                    defaultValue={selectableAttributeOptions[0]}
                    name={item.alias}
                    options={selectableAttributeOptions}
                    theme={theme === ETheme.Light ? "primary" : "secondary"}
                  />
                </div>
              );
            })}
        </div>
        <div className="ProductAdd-FormFieldGroup">
          {attributesByCatalog &&
            attributesByCatalog.numberAttribute &&
            attributesByCatalog.numberAttribute.map((item) => {
              return <Input key={item.id} label={item.name} name={item.alias} type="number" />;
            })}
        </div>
        <div className="ProductAdd-Control">
          <Button className="ProductAdd-Button" type="submit">
            Создать
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function productAddLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
