import { useEffect } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";
import { SearchingPanel } from "~/components/search";
import { ERoutes } from "~/enums";
import { useTable } from "~/hooks";
import { attributeAddLinks } from "~/pages/Admin/Attributes/AttributeAdd";
import { attributeEditLinks } from "~/pages/Admin/Attributes/AttributeEdit";
import {
  AttributesTable,
  attributesTableLinks,
  ETableColumns,
} from "~/pages/Admin/Attributes/AttributesTable";
import { EAttributeAction } from "~/shared/api/attributes";
import type { TAttributes } from "~/shared/api/attributes";
import { EFormMethods } from "~/shared/form";
import { ETypographyVariant, LinkButton, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./Attributes.module.css";

type TProps = {
  attributes: TAttributes;
};

export const Attributes: FC<TProps> = (props) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const attributes = fetcher.data?.attributes ?? props.attributes;

  const onDeleteAttribute = (alias: string) => {
    const form = new FormData();
    form.append("alias", `${alias}`);
    form.append("_method", EAttributeAction.DeleteAttribute);
    fetcher.submit(form, {
      method: EFormMethods.Delete,
      action: createPath({ route: ERoutes.AdminAttributes, withIndex: true }),
    });
  };

  const {
    defaultSearch,
    deleteModal,
    isSearchActive,
    onChangePage,
    onChangeSize,
    onClickDeleteIcon,
    onCloseDeleteModal,
    onDeleteSubmit,
    onSearch,
    onSearchBlur,
    onSearchFocus,
    onSearchKeyDown,
    onSortTableByProperty,
  } = useTable({
    onDelete: onDeleteAttribute,
    pageOption: attributes.currentPage,
    sizeOption: attributes.pageSize,
  });

  useEffect(() => {
    if (fetcher.data && !fetcher.data?.success) {
      notify.error({
        title: "Ошибка",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, fetcher.data?.success]);

  return (
    <section className="Attributes">
      <div className="Attributes-Header">
        <div>
          <h1 className="Attributes-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>
              {t("pages.admin.attributes.title")}
            </Typography>
          </h1>
        </div>
        <div className="Attributes-HeaderControls">
          <SearchingPanel
            className="Attributes-SearchingPanel"
            defaultSearch={defaultSearch}
            isActive={isSearchActive}
            onBlur={onSearchBlur}
            onClick={onSearchFocus}
            onFocus={onSearchFocus}
            onKeyDown={onSearchKeyDown}
            onSubmit={onSearch}
          />
          <LinkButton className="Attributes-LinkButton" href="/admin/attributes/add">
            {t("common.actions.add")}
          </LinkButton>
        </div>
      </div>
      <AttributesTable
        attributes={attributes}
        fetcher={fetcher}
        fieldsSortState={{
          columns: [ETableColumns.Alias, ETableColumns.Name],
          multiple: true,
          onChangeSorting: onSortTableByProperty,
        }}
        isOpenDeleteModal={deleteModal.isOpen}
        onChangePage={onChangePage}
        onChangePageSize={onChangeSize}
        onCloseModal={onCloseDeleteModal}
        onClickDeleteIcon={onClickDeleteIcon}
        onSubmitDelete={onDeleteSubmit}
      />
    </section>
  );
};

export function attributesLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...attributeAddLinks(),
    ...attributeEditLinks(),
    ...attributesTableLinks(),
  ];
}
