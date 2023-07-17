import {useEffect, useState} from "react";
import type {FC, ChangeEvent, MouseEvent} from "react";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {ERoutes} from "~/enums";
import {useTheme} from "~/hooks";
import {EAttributeType} from "~/pages";
import {EFormFields, formSchema, mapFormDataToDto} from "~/pages/Admin/Attributes/AttributeAdd";
import type {TForm, TOptionsSubmitForm} from "~/pages/Admin/Attributes/AttributeAdd";
import {Checkbox, EFormMethods, Form, Input, Select, useInitForm} from "~/shared/form";
import type {TDomainErrors, TParams} from "~/types";
import {Button, ETypographyVariant, Input as InputUI, notify, Tag, Typography} from "~/uikit";
import {createPath} from "~/utils";
import styles from "./AttributeAdd.css";

type TSelectableItem = {
  value: string;
};

type TProps = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success: boolean;
}

export const AttributeAdd: FC<TProps> = (props) => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  const idCheckbox = "checkbox";
  const [filter, setFilter] = useState<TParams>({filter: [idCheckbox]});

  const selectTypeOptions = [
    {value: EAttributeType.Selectable, label: EAttributeType.Selectable},
    {value: EAttributeType.Double, label: EAttributeType.Double},
  ];

  const [currentSelectableValue, setCurrentSelectableValue] = useState("");
  const [selectable, setSelectable] = useState<TSelectableItem[]>([]);

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const {watch} = form.methods;
  const watchType = watch(EFormFields.Type);
  const isSelectableType = watchType?.value === EAttributeType.Selectable;

  useEffect(() => {
    if (isDoneType && !props.success && !props.fieldErrors) {
      notify.error({
        title: "Ошибка выполнения",
      });
    }
    if (isDoneType && props.success && !props.fieldErrors) {
      notify.success({
        title: "Создано",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.success, isDoneType]);

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

  const handleChangeEnabled = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    nameGroup: string,
  ) => {
    const {
      target: {checked, value},
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

  const handleSubmit = (params: TParams, {fetcher}: TOptionsSubmitForm) => {
    const formattedParams = mapFormDataToDto({...params, ...(isSelectableType && {selectable})});
    console.log("formattedParams: ", formattedParams);

    fetcher.submit(formattedParams, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AdminAttributeAdd,
        withIndex: true,
      }),
    });
  };

  return (
    <section>
      <h1 className="AttributeAdd-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.attributeAdd.title")}
        </Typography>
      </h1>
      <Form<TForm>
        className="AttributeAdd-Form"
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Post}
      >
        <Input label={t("form.alias.title") ?? "Alias"} name={EFormFields.Alias} type="text"/>
        <Input label={t("form.name.title") ?? "Name"} name={EFormFields.Name} type="text"/>
        <div className="AttributeAdd-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Filter].includes(idCheckbox)}
            id={idCheckbox}
            label={t("form.filter.title") ?? "Filter"}
            name={EFormFields.Filter}
            nameGroup="filter"
            onChange={(event, id, nameGroup) => handleChangeEnabled(event, id, nameGroup)}
          />
        </div>
        <div className="AttributeAdd-FormFieldGroup">
          <Select
            defaultValue={selectTypeOptions[0]}
            name={EFormFields.Type}
            options={selectTypeOptions}
            theme={theme}
          />
        </div>
        {isSelectableType && (
          <>
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
              label={t("form.value.title") ?? "Value"}
              name="Selectable"
              type="text"
              value={currentSelectableValue}
              onChange={handleChangeSelectableValue}
            />
            <Button className="AttributeAdd-Button" type="button" onClick={handleSelectableValueAdd}>
              {t("pages.admin.attributeAdd.addValue")}
            </Button>
          </>
        )}
        <div className="AttributeAdd-FormControl">
          <Button className="AttributeAdd-Button" type="submit">
            {t("common.actions.create")}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function attributeAddLinks() {
  return [{rel: "stylesheet", href: styles}];
}
