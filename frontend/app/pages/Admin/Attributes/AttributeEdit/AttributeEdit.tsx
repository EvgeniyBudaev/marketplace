import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes, ETheme } from "~/enums";
import { useSettings } from "~/hooks";
import { mapFormDataToDto } from "~/pages/Admin/Attributes/AttributeAdd";
import {
  EFormFields,
  formSchema,
  TForm,
  TOptionsSubmitForm,
  useGetTypeOptions,
} from "~/pages/Admin/Attributes/AttributeEdit";
import { TAttributeDetail, TSelectableItem } from "~/shared/api/attributes";
import { Checkbox, EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import { TParams } from "~/types";
import {
  Button,
  ETypographyVariant,
  Input as InputUI,
  Modal,
  notify,
  Tag,
  Typography,
} from "~/uikit";
import { createPath } from "~/utils";
import styles from "./AttributeEdit.module.css";
import { SelectableTable } from "~/pages/Admin/Attributes/SelectableTable";

type TProps = {
  attribute: TAttributeDetail;
};

export const AttributeEdit: FC<TProps> = ({ attribute }) => {
  const settings = useSettings();
  const theme = settings.settings.theme;

  const idCheckbox = "checkbox";
  const [filter, setFilter] = useState<TParams>({ filter: [idCheckbox] });

  console.log("attribute: ", attribute);

  const { defaultTypeOptions, typeOptions } = useGetTypeOptions(attribute.type);

  const [selectable, setSelectable] = useState<TSelectableItem[]>(attribute?.selectable ?? []);
  console.log("selectable: ", selectable);

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

  const handleChangeSelectableValue = ({ id, value }: { id: number; value: string }) => {
    setSelectable((prevState) => {
      const idx = prevState.findIndex((item) => item.id === id);
      const oldItem = prevState[idx];
      const newItem = { ...oldItem, value };
      return [...prevState.slice(0, idx), newItem, ...prevState.slice(idx + 1)];
    });
  };

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    console.log("Form params: ", params);
    const formattedParams: any = mapFormDataToDto({ ...params, selectable });
    console.log("formattedParams: ", formattedParams);

    const formData = new FormData();
    formData.append("alias", formattedParams.alias);
    formData.append("name", formattedParams.name);
    formData.append("type", formattedParams.type);
    formData.append("selectable", JSON.stringify(formattedParams.selectable));

    fetcher.submit(formattedParams, {
      method: EFormMethods.Patch,
      action: createPath({
        route: ERoutes.AttributeEdit,
        params: { alias: attribute.alias },
        withIndex: true,
      }),
    });
  };

  return (
    <section>
      <h1 className="AttributeEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Редактирование атрибута</Typography>
      </h1>
      <Form<TForm>
        className="AttributeEdit-Form"
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Patch}
      >
        <Input
          label="Название атрибута"
          name={EFormFields.Name}
          type="text"
          defaultValue={attribute.name}
        />
        <Input label="Alias" name={EFormFields.Alias} type="text" defaultValue={attribute.alias} />
        <div className="AttributeEdit-FormFieldGroup">
          <Select
            defaultValue={defaultTypeOptions}
            name={EFormFields.Type}
            options={typeOptions}
            theme={theme === ETheme.Light ? "primary" : "secondary"}
          />
        </div>
        <div className="AttributeEdit-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Filter].includes(idCheckbox)}
            id={idCheckbox}
            label={"filter"}
            name={EFormFields.Filter}
            nameGroup={"filter"}
            onChange={(event, id, nameGroup) => handleChangeEnabled(event, id, nameGroup)}
          />
        </div>
        <SelectableTable
          items={attribute.selectable ?? []}
          onChangeSelectableValue={handleChangeSelectableValue}
        />
        <div className="AttributeEdit-FormControl">
          <Button className="AttributeEdit-Button" type="submit">
            Сохранить
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function attributeEditLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
