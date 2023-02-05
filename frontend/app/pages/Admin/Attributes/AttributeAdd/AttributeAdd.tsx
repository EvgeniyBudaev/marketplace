import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes, ETheme } from "~/enums";
import { useSettings } from "~/hooks";
import {
  EFormFields,
  formSchema,
  mapFormDataToDto,
  TForm,
  TOptionsSubmitForm,
} from "~/pages/Admin/Attributes/AttributeAdd";
import { EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import { TParams } from "~/types";
import { Button, ETypographyVariant, Input as InputUI, notify, Tag, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./AttributeAdd.module.css";

type TSelectableItem = {
  value: string;
};

export const AttributeAdd: FC = () => {
  const settings = useSettings();
  const theme = settings.settings.theme;

  const selectTypeOptions = [
    { value: "SELECTABLE", label: "SELECTABLE" },
    { value: "DOUBLE", label: "DOUBLE" },
  ];

  const [currentSelectableValue, setCurrentSelectableValue] = useState("");
  const [value, setValue] = useState("");
  const [selectable, setSelectable] = useState<TSelectableItem[]>([]);

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const fetcher = form.fetcher;
  // console.log("form.fetcher: ", form.fetcher);

  useEffect(() => {
    if (isDoneType && fetcher.data?.success) {
      notify.success({
        title: "Атрибут добавлен",
      });
    }

    if (isDoneType && !fetcher.data?.success && !fetcher.data?.fieldErrors) {
      notify.error({
        title: "Не удалось добавить атрибут",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, fetcher.data?.success, isDoneType]);

  const handleChangeSelectableValue = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSelectableValue(event.target.value);
  };

  const handleSelectableValueAdd = (event?: MouseEvent<HTMLButtonElement>): void => {
    const newItem = {
      value: currentSelectableValue,
    };
    setSelectable((prevState) => {
      let uniqueObjectsList: TSelectableItem[] = [];
      const uniqueObjectSet = new Set();
      const listNew = [...prevState, newItem];
      for (const object of listNew) {
        const objectJSON = JSON.stringify(object);
        if (!uniqueObjectSet.has(objectJSON)) {
          uniqueObjectsList = [...uniqueObjectsList, object];
        }
        uniqueObjectSet.add(objectJSON);
      }
      return uniqueObjectsList;
    });
    setCurrentSelectableValue("");
  };

  useEffect(() => {
    setValue(selectable.toString());
  }, [selectable]);

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
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AttributeAdd,
        withIndex: true,
      }),
    });
  };

  return (
    <section>
      <h1 className="AttributeAdd-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Добавление атрибута</Typography>
      </h1>
      <Form<TForm>
        className="AttributeAdd-Form"
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Post}
      >
        <Input label="Название атрибута" name={EFormFields.Name} type="text" />
        <Input label="Alias" name={EFormFields.Alias} type="text" />
        <div className="AttributeAdd-FormFieldGroup">
          <Select
            defaultValue={selectTypeOptions[0]}
            name={EFormFields.Type}
            options={selectTypeOptions}
            theme={theme === ETheme.Light ? "primary" : "secondary"}
          />
        </div>
        <div className="AttributeAdd-FormFieldGroup">
          <div className="AttributeAdd-TagList">
            {selectable.map((tag, index) => (
              <Tag
                className="AttributeAdd-TagListItem"
                key={`${tag.value}${index}`}
                title={tag.value}
              />
            ))}
          </div>
        </div>
        <InputUI
          label="Значение атрибута"
          name="Selectable"
          type="text"
          value={currentSelectableValue}
          onChange={handleChangeSelectableValue}
        />
        <Button className="AttributeAdd-Button" type="button" onClick={handleSelectableValueAdd}>
          Добавить значение в список
        </Button>
        <div className="AttributeAdd-FormControl">
          <Button className="AttributeAdd-Button" type="submit">
            Создать
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function attributeAddLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
