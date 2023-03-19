import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "~/enums";
import { useTheme } from "~/hooks";
import {
  useGetAttributeByCatalogOptions,
  useGetAttributeOptions,
} from "~/pages/Admin/Catalogs/hooks";
import {
  EFormFields,
  formSchema,
  mapCatalogEditFormDataToDto,
} from "~/pages/Admin/Catalogs/CatalogEdit";
import type { TForm, TOptionsSubmitForm } from "~/pages/Admin/Catalogs/CatalogEdit";
import type { TAttributes, TAttributesByCatalog } from "~/shared/api/attributes";
import type { TCatalogDetail } from "~/shared/api/catalogs";
import { Checkbox, EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./CatalogEdit.module.css";

type TProps = {
  attributes: TAttributes;
  attributesByCatalog: TAttributesByCatalog;
  catalog: TCatalogDetail;
};

export const CatalogEdit: FC<TProps> = ({ attributes, attributesByCatalog, catalog }) => {
  const { theme } = useTheme();

  const idCheckbox = "enabled";
  const [filter, setFilter] = useState<TParams>({ enabled: catalog.enabled ? [idCheckbox] : [] });

  const { attributeOptions } = useGetAttributeOptions({ attributes });
  console.log("attributeOptions: ", attributeOptions);
  const { attributeByCatalogOptions } = useGetAttributeByCatalogOptions({ attributesByCatalog });

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const fetcher = form.fetcher;

  useEffect(() => {
    if (isDoneType && fetcher.data?.success) {
      notify.success({
        title: "Каталог добавлен",
      });
    }

    if (isDoneType && !fetcher.data?.success && !fetcher.data?.fieldErrors) {
      notify.error({
        title: "Не удалось добавить каталог",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, fetcher.data?.success, isDoneType]);

  const onChangeCheckedBox = (
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

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    console.log("Form params: ", params);
    const formattedParams = mapCatalogEditFormDataToDto({
      ...params,
      id: catalog.id,
      attributeAlias: params.attributeAlias,
    });

    fetcher.submit(formattedParams, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AdminCatalogEdit,
        params: { alias: catalog.alias },
      }),
    });
  };

  return (
    <section>
      <h1 className="CatalogEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Редактирование каталога</Typography>
      </h1>
      <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
        <Input defaultValue={catalog.alias} label="Alias" name={EFormFields.Alias} type="text" />
        <div className="CatalogEdit-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Enabled].includes(idCheckbox)}
            id={idCheckbox}
            label={"enabled"}
            name={EFormFields.Enabled}
            nameGroup={"enabled"}
            onChange={(event, id, nameGroup) => onChangeCheckedBox(event, id, nameGroup)}
          />
        </div>
        <Input
          defaultValue={catalog?.image ?? ""}
          label="Image"
          name={EFormFields.Image}
          type="text"
        />
        <Input defaultValue={catalog.name} label="Name" name={EFormFields.Name} type="text" />
        <div className="CatalogEdit-FormFieldGroup">
          <Select
            defaultValue={attributeByCatalogOptions}
            isMulti={true}
            name={EFormFields.AttributeAlias}
            options={attributeOptions}
            theme={theme}
          />
        </div>
        <div className="CatalogEdit-Control">
          <Button className="CatalogEdit-Button" type="submit">
            Сохранить
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function catalogEditLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
