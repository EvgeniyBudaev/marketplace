import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "~/enums";
import {
  EFormFields,
  formSchema,
  mapFormDataToDto,
  TForm,
  TOptionsSubmitForm,
} from "~/pages/Admin/Attributes/AttributeAdd";
import { EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import { TParams } from "~/types";
import { Button, ETypographyVariant, Input as InputUI, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./AttributeAdd.module.css";

type TSelectableItem = {
  value: string;
};

export const AttributeAdd: FC = () => {
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
    console.log("event.target.value: ", event.target.value);
    setCurrentSelectableValue(event.target.value);
  };

  const handleSelectableValueAdd = (event?: MouseEvent<HTMLButtonElement>): void => {
    const newItem = {
      value: currentSelectableValue,
    };
    setSelectable((prevState) => [...prevState, newItem]);
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
      <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
        <Input label="Название атрибута" name={EFormFields.Name} type="text" />
        <Input label="Alias" name={EFormFields.Alias} type="text" />
        <Select
          defaultValue={selectTypeOptions[0]}
          id="2"
          instanceId="2"
          name={EFormFields.Type}
          options={selectTypeOptions}
        />
        <div>
          <pre>{JSON.stringify(selectable, null, 2)}</pre>
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
        <div className="AttributeAdd-Control">
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
