import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "~/enums";
import { EFormFields } from "~/pages/Admin/Catalogs/CatalogAdd/enums";
import { formSchema } from "~/pages/Admin/Catalogs/CatalogAdd/schemas";
import { TForm, TOptionsSubmitForm } from "~/pages/Admin/Catalogs/CatalogAdd/types";
import { Checkbox, EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import { Button, ETypographyVariant, Typography } from "~/uikit";
import styles from "./CatalogAdd.module.css";
import { TParams } from "~/types";
import { createPath } from "~/utils";
import { ChangeEvent, useState } from "react";

export const CatalogAdd: FC = () => {
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
