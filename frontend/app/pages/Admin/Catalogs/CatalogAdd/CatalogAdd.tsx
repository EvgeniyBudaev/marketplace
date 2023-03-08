import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes, ETheme } from "~/enums";
import { useSettings } from "~/hooks";
import { useGetAttributeOptions } from "~/pages/Admin/Catalogs/hooks";
import {
  EFormFields,
  formSchema,
  mapCatalogAddFormDataToDto,
} from "~/pages/Admin/Catalogs/CatalogAdd";
import type { TForm, TOptionsSubmitForm } from "~/pages/Admin/Catalogs/CatalogAdd";
import type { TAttributes } from "~/shared/api/attributes";
import { Checkbox, EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./CatalogAdd.module.css";

type TProps = {
  attributes: TAttributes;
};

export const CatalogAdd: FC<TProps> = ({ attributes }) => {
  const settings = useSettings();
  const theme = settings.settings.theme;

  const idCheckbox = "checkbox";
  const [filter, setFilter] = useState<TParams>({ enabled: [] });

  const { attributeOptions } = useGetAttributeOptions({ attributes });

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const fetcher = form.fetcher;
  console.log("form.fetcher: ", form.fetcher);

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
    const formattedParams = mapCatalogAddFormDataToDto({
      ...params,
      attributeAlias: params.attributeAlias,
    });
    fetcher.submit(formattedParams, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AdminCatalogAdd,
      }),
    });
  };

  return (
    <section>
      <h1 className="CatalogAdd-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Добавление каталога</Typography>
      </h1>
      <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
        <Input label="Alias" name={EFormFields.Alias} type="text" />
        <div className="CatalogAdd-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Enabled].includes(idCheckbox)}
            id={idCheckbox}
            label={"enabled"}
            name={EFormFields.Enabled}
            nameGroup={"enabled"}
            onChange={(event, id, nameGroup) => onChangeCheckedBox(event, id, nameGroup)}
          />
        </div>
        <Input label="Image" name={EFormFields.Image} type="text" />
        <Input label="Name" name={EFormFields.Name} type="text" />
        <div className="CatalogAdd-FormFieldGroup">
          <Select
            defaultValue={attributeOptions[0]}
            isMulti={true}
            name={EFormFields.AttributeAlias}
            options={attributeOptions}
            theme={theme === ETheme.Light ? "primary" : "secondary"}
          />
        </div>
        <div className="CatalogAdd-Control">
          <Button className="CatalogAdd-Button" type="submit">
            Создать
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function catalogAddLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
