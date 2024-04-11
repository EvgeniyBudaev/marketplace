import { useEffect } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useNavigate } from "@remix-run/react";

import { ModalDelete } from "#app/components/modal";
import { SearchingPanel } from "#app/components/search";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "#app/constants";
import { ERoutes } from "#app/enums";
import { useTable } from "#app/hooks";
import { attributeAddLinks } from "#app/pages/Admin/Attributes/AttributeAdd";
import { attributeEditLinks } from "#app/pages/Admin/Attributes/AttributeEdit";
import {
  AttributesTable,
  attributesTableLinks,
  ETableColumns,
} from "#app/pages/Admin/Attributes/AttributesTable";
import { EAttributeAction } from "#app/shared/api/attributes";
import type { TAttributes } from "#app/shared/api/attributes";
import { getFetcherOptions } from "#app/shared/fetcher";
import { EFormMethods } from "#app/shared/form";
import { ETypographyVariant, LinkButton, notify, Typography } from "#app/uikit";
import { createPath } from "#app/utils";
import styles from "./Attributes.css";

type TProps = {
  attributes: TAttributes;
};

export const Attributes: FC<TProps> = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { isLoading } = getFetcherOptions(fetcher);
  const attributes: TAttributes = fetcher.data?.attributes ?? props.attributes;

  const handleAttributeDelete = (alias: string) => {
    const form = new FormData();
    form.append("alias", `${alias}`);
    form.append("_method", EAttributeAction.DeleteAttribute);
    fetcher.submit(form, {
      method: EFormMethods.Delete,
      action: createPath({ route: ERoutes.AdminAttributes, withIndex: true }),
    });
  };

  const handleAttributeEdit = (alias: string) => {
    const path = createPath({
      route: ERoutes.AdminAttributeEdit,
      params: { alias },
    });
    navigate(path);
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
    onDelete: handleAttributeDelete,
    pageOption: attributes?.currentPage ?? DEFAULT_PAGE,
    sizeOption: attributes?.pageSize ?? DEFAULT_PAGE_SIZE,
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
          <LinkButton
            className="Attributes-LinkButton"
            href="/admin/attributes/add"
          >
            {t("common.actions.add")}
          </LinkButton>
        </div>
      </div>
      <AttributesTable
        attributes={attributes}
        fieldsSortState={{
          columns: [ETableColumns.Alias, ETableColumns.Name],
          multiple: true,
          onChangeSorting: onSortTableByProperty,
        }}
        isLoading={isLoading}
        onAttributeDelete={onClickDeleteIcon}
        onAttributeEdit={handleAttributeEdit}
        onChangePage={onChangePage}
        onChangePageSize={onChangeSize}
      />
      <ModalDelete
        isOpen={deleteModal.isOpen}
        onClose={onCloseDeleteModal}
        onSubmit={onDeleteSubmit}
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
