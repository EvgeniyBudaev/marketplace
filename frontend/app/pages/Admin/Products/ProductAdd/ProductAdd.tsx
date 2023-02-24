import { useState } from "react";
import type { FC, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes, ETheme } from "~/enums";
import { useSettings } from "~/hooks";
import { useGetCatalogAlias } from "~/pages/Admin/Products/hooks";
import { EFormFields, formSchema } from "~/pages/Admin/Products/ProductAdd";
import type { TForm, TOptionsSubmitForm } from "~/pages/Admin/Products/ProductAdd";
import type { TCatalogs } from "~/shared/api/catalogs";
import { Checkbox, EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./ProductAdd.module.css";

type TProps = {
  catalogs: TCatalogs;
};

export const ProductAdd: FC<TProps> = ({ catalogs }) => {
  const settings = useSettings();
  const theme = settings.settings.theme;

  const idCheckbox = "checkbox";
  const [filter, setFilter] = useState<TParams>({ enabled: [idCheckbox] });

  const { catalogAliasesTypeOptions } = useGetCatalogAlias({ catalogs });

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
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

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    console.log("Form params: ", params);
    fetcher.submit(params, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.CatalogAdd,
        withIndex: true,
      }),
    });
  };

  return (
    <section>
      <h1 className="ProductAdd-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Добавление продукта</Typography>
      </h1>
      <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
        <Input label="Alias" name={EFormFields.Alias} type="text" />
        <div className="AttributeAdd-FormFieldGroup">
          <Select
            defaultValue={catalogAliasesTypeOptions[0]}
            name={EFormFields.CatalogAlias}
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
