import {useEffect, useState} from "react";
import type {FC, ChangeEvent} from "react";
import {useTranslation} from "react-i18next";
import {useFetcher} from "@remix-run/react";
import {useAuthenticityToken} from "remix-utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {ERoutes} from "~/enums";
import {useTheme} from "~/hooks";
import {EAttributeType} from "~/pages";
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
import {SelectableAddModal} from "~/pages/Admin/Attributes/SelectableAddModal";
import {SelectableTable} from "~/pages/Admin/Attributes/SelectableTable";
import {EAttributeAction, ESelectableValueAction} from "~/shared/api/attributes";
import type {TAttributeDetail, TSelectableItem} from "~/shared/api/attributes";
import {Checkbox, EFormMethods, Form, Input, Select, useInitForm} from "~/shared/form";
import type {TDomainErrors, TParams} from "~/types";
import {Button, ETypographyVariant, notify, Tooltip, Typography} from "~/uikit";
import {createPath} from "~/utils";
import styles from "./AttributeEdit.css";

type TProps = {
  attribute: TAttributeDetail;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success: boolean;
};

export const AttributeEdit: FC<TProps> = (props) => {
  const csrf = useAuthenticityToken();
  const {t} = useTranslation();
  const fetcherRemix = useFetcher();
  const attribute: TAttributeDetail = fetcherRemix.data?.attribute ?? props.attribute;
  console.log("attribute: ", attribute);

  const {theme} = useTheme();

  const idCheckbox = "checkbox";
  const [filter, setFilter] = useState<TParams>({filter: [attribute.filter ? idCheckbox : []]});
  const [addModal, setAddModal] = useState<TAddModalState>({isOpen: false});

  // console.log("attribute: ", attribute);

  const {defaultTypeOptions, typeOptions} = useGetTypeOptions(attribute.type);

  const [selectable] = useState<TSelectableItem[]>(attribute?.selectable ?? []);
  // console.log("selectable: ", selectable);

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const {watch} = form.methods;
  const watchType = watch(EFormFields.Type);
  const isSelectableType = watchType?.value === EAttributeType.Selectable;
  const fetcher = form.fetcher;

  useEffect(() => {
    if (isDoneType && !props.success && !props.fieldErrors) {
      notify.error({
        title: "Ошибка выполнения",
      });
    }
    if (isDoneType && props.success && !props.fieldErrors) {
      notify.success({
        title: "Обновлено",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.success, isDoneType]);

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

  const handleCloseAddModal = () => {
    setAddModal((prev) => ({...prev, isOpen: false}));
  };

  const handleOpenAddModal = () => {
    setAddModal((prev) => ({...prev, isOpen: true}));
  };

  const handleAdd = (value: string) => {
    const formattedParams = {
      attributeAlias: attribute.alias,
      value,
      _method: ESelectableValueAction.AddSelectableValue,
      csrf
    }
    fetcher.submit(formattedParams, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.AdminAttributeEdit,
        params: {alias: attribute.alias},
        withIndex: true,
      }),
    });
  };

  const handleSubmitAddModal = ({value}: { value: string }) => {
    if (value) {
      handleAdd(value);
      handleCloseAddModal();
    }
  };

  const handleSubmitDeleteSelectableValue = (id: number) => {
    const formattedParams = {
      id: id.toString(),
      csrf,
      _method: ESelectableValueAction.DeleteSelectableValue
    }
    fetcher.submit(formattedParams, {
      method: EFormMethods.Delete,
      action: createPath({
        route: ERoutes.AdminAttributeEdit,
        params: {alias: attribute.alias},
        withIndex: true,
      }),
    });
  }

  const handleSubmitEditSelectableValue = ({id, value}: { id: number; value: string }) => {
    const formattedParams = {
      id: id.toString(),
      value,
      _method: ESelectableValueAction.EditSelectableValue,
      csrf
    }
    fetcher.submit(formattedParams, {
      method: EFormMethods.Patch,
      action: createPath({
        route: ERoutes.AdminAttributeEdit,
        params: {alias: attribute.alias},
        withIndex: true,
      }),
    });
  }

  const handleSubmit = (params: TParams, {fetcher}: TOptionsSubmitForm) => {
    // console.log("Form params: ", params);
    const formattedParams = mapFormDataToDto({
      ...params,
      id: attribute.id,
      ...(isSelectableType && {selectable}),
      _method: EAttributeAction.EditAttribute,
      csrf
    });
    console.log("formattedParams: ", formattedParams);

    fetcher.submit(formattedParams, {
      method: EFormMethods.Put,
      action: createPath({
        route: ERoutes.AdminAttributeEdit,
        params: {alias: attribute.alias},
        withIndex: true,
      }),
    });
  };

  return (
    <section>
      <h1 className="AttributeEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.attributeEdit.title")}
        </Typography>
      </h1>
      <Form<TForm>
        className="AttributeEdit-Form"
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Patch}
      >
        <Input
          label={t("form.alias.title") ?? "Alias"}
          name={EFormFields.Alias}
          type="text"
          defaultValue={attribute.alias}
        />
        <Input
          label={t("form.name.title") ?? "Name"}
          name={EFormFields.Name}
          type="text"
          defaultValue={attribute.name}
        />
        <div className="AttributeEdit-FormFieldGroup">
          <Checkbox
            checked={filter && filter[EFormFields.Filter].includes(idCheckbox)}
            id={idCheckbox}
            label={t("form.filter.title") ?? "Filter"}
            name={EFormFields.Filter}
            nameGroup="filter"
            onChange={(event, id, nameGroup) => handleChangeEnabled(event, id, nameGroup)}
          />
        </div>
        <div className="AttributeEdit-FormFieldGroup">
          <Select
            defaultValue={defaultTypeOptions}
            name={EFormFields.Type}
            options={typeOptions}
            theme={theme}
          />
        </div>
        {isSelectableType && (
          <>
            <div className="AttributeEdit-FormFieldGroup">
              <Tooltip message={t("pages.admin.attributeEdit.tooltip.buttonAdd")}>
                <Button isDisabled={attribute?.type === EAttributeType.Double}
                        onClick={handleOpenAddModal}>{t("common.actions.add")}</Button>
              </Tooltip>
            </div>
            <SelectableTable
              attribute={attribute}
              csrf={csrf}
              fetcher={fetcherRemix}
              items={attribute.selectable ?? []}
              onDeleteSelectableValue={handleSubmitDeleteSelectableValue}
              onEditSelectableValue={handleSubmitEditSelectableValue}
            />
          </>
        )}
        <div className="AttributeEdit-FormControl">
          <Button className="AttributeEdit-Button" type="submit">
            {attribute?.type === EAttributeType.Double ? t("common.actions.update") : t("common.actions.save")}
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
  return [{rel: "stylesheet", href: styles}];
}
