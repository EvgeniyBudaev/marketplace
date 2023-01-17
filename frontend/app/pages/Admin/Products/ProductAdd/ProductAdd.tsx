import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "~/enums";
import { EFormFields } from "~/pages/Admin/Products/ProductAdd/enums";
import { formSchema } from "~/pages/Admin/Products/ProductAdd/schemas";
import { TForm, TOptionsSubmitForm } from "~/pages/Admin/Products/ProductAdd/types";
import { Checkbox, EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import { Button, ETypographyVariant, Typography } from "~/uikit";
import styles from "./ProductAdd.module.css";
import { TParams } from "~/types";
import { createPath } from "~/utils";
import { ChangeEvent, useState } from "react";

export const ProductAdd: FC = () => {
  const idCheckbox = "checkbox";
  const [filter, setFilter] = useState<TParams>({ enabled: [] });
  console.log("filter: ", filter);
  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });

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
        <Input label="CatalogAlias" name={EFormFields.CatalogAlias} type="text" />
        <Input label="Description" name={EFormFields.Description} type="text" />
        <div className="ProductAddd-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Enabled].includes(idCheckbox)}
            id={idCheckbox}
            label={"enabled"}
            name={EFormFields.Enabled}
            nameGroup={"enabled"}
            onChange={(event, id, nameGroup) => onChangeCheckedBox(event, id, nameGroup)}
          />
        </div>
        <Input label="Name" name={EFormFields.Name} type="text" />
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
