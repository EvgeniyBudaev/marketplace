import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import { useFetcher } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "~/enums";
import { useTheme } from "~/hooks";
import {
  EFormFields,
  formSchema,
  mapFormDataToDto,
  useGetTypeOptions,
} from "~/pages/Admin/Attributes/AttributeEdit";
import type {
  TAddModalState,
  TForm,
  TOptionsSubmitForm,
} from "~/pages/Admin/Attributes/AttributeEdit";
import { SelectableAddModal } from "~/pages/Admin/Attributes/SelectableAddModal";
import { SelectableTable } from "~/pages/Admin/Attributes/SelectableTable";
import { EAttributeAction, ESelectableValueAction } from "~/shared/api/attributes";
import type { TAttributeDetail, TSelectableItem } from "~/shared/api/attributes";
import { Checkbox, EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./AttributeEdit.module.css";

type TProps = {
  attribute: TAttributeDetail;
};

export const AttributeEdit: FC<TProps> = (props) => {
  const fetcherRemix = useFetcher();
  const attribute: TAttributeDetail = fetcherRemix.data?.attribute ?? props.attribute;

  const { theme } = useTheme();

  const idCheckbox = "checkbox";
  const [filter, setFilter] = useState<TParams>({ filter: [attribute.filter ? [idCheckbox] : []] });

  const [addModal, setAddModal] = useState<TAddModalState>({ isOpen: false });

  // console.log("attribute: ", attribute);

  const { defaultTypeOptions, typeOptions } = useGetTypeOptions(attribute.type);

  const [selectable] = useState<TSelectableItem[]>(attribute?.selectable ?? []);
  // console.log("selectable: ", selectable);

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const fetcher = form.fetcher;

  useEffect(() => {
    if (fetcher.data && fetcher.data?.success) {
      notify.success({
        title: "Выполнено",
      });
    }
    if (fetcher.data && !fetcher.data?.success) {
      notify.error({
        title: "Ошибка выполнения",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, fetcher.data?.success, isDoneType]);

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
    const form = new FormData();
    form.append("id", `${id}`);
    form.append("value", `${value}`);
    form.append("_method", ESelectableValueAction.EditSelectableValue);
    fetcher.submit(form, {
      method: EFormMethods.Patch,
      action: createPath({
        route: ERoutes.AdminAttributeEdit,
        params: { alias: attribute.alias },
        withIndex: true,
      }),
    });
  };

  const handleCloseAddModal = () => {
    setAddModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenAddModal = () => {
    setAddModal((prev) => ({ ...prev, isOpen: true }));
  };

  const handleAdd = (value: string) => {
    const form = new FormData();
    form.append("attributeAlias", `${attribute.alias}`);
    form.append("value", `${value}`);
    form.append("_method", ESelectableValueAction.AddSelectableValue);
    fetcher.submit(form, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AdminAttributeEdit,
        params: { alias: attribute.alias },
        withIndex: true,
      }),
    });
  };

  const handleSubmitAddModal = ({ value }: { value: string }) => {
    if (value) {
      handleAdd(value);
      handleCloseAddModal();
    }
  };

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    // console.log("Form params: ", params);
    const formattedParams = mapFormDataToDto({
      ...params,
      id: attribute.id,
      selectable,
      _method: EAttributeAction.EditAttribute,
    });
    // console.log("formattedParams: ", formattedParams);

    fetcher.submit(formattedParams, {
      method: EFormMethods.Put,
      action: createPath({
        route: ERoutes.AdminAttributeEdit,
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
            theme={theme}
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
        <div>
          <Button onClick={handleOpenAddModal}>Добавить новое значение</Button>
        </div>
        <SelectableTable
          attribute={attribute}
          fetcher={fetcherRemix}
          items={attribute.selectable ?? []}
          onChangeSelectableValue={handleChangeSelectableValue}
        />
        <div className="AttributeEdit-FormControl">
          <Button className="AttributeEdit-Button" type="submit">
            Сохранить
          </Button>
        </div>
      </Form>
      <SelectableAddModal
        isOpen={addModal.isOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmitAddModal}
      />
    </section>
  );
};

export function attributeEditLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
