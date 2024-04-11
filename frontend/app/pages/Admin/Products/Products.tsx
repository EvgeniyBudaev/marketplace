import { useEffect, useRef } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useNavigate } from "@remix-run/react";

import { ModalDelete } from "#app/components/modal";
import { SearchingPanel } from "#app/components/search";
import { ERoutes } from "#app/enums";
import { useScrollToTable, useTable } from "#app/hooks";
import { productAddLinks } from "#app/pages/Admin/Products/ProductAdd";
import { productEditLinks } from "#app/pages/Admin/Products/ProductEdit";
import {
  ETableColumns,
  ProductsTable,
  productsTableLinks,
} from "#app/pages/Admin/Products/ProductsTable";
import { EProductAction } from "#app/shared/api/products";
import type { TProducts } from "#app/shared/api/products";
import { getFetcherOptions } from "#app/shared/fetcher";
import { EFormMethods } from "#app/shared/form";
import { ETypographyVariant, LinkButton, notify, Typography } from "#app/uikit";
import { createPath } from "#app/utils";
import styles from "./Products.css";

type TProps = {
  products: TProducts;
};

export const Products: FC<TProps> = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { isLoading } = getFetcherOptions(fetcher);
  const products = fetcher.data?.products ?? props.products;
  const tableRef = useRef<HTMLDivElement>(null);

  useScrollToTable({ ref: tableRef, content: products.content });

  const handleProductEdit = (alias: string) => {
    const path = createPath({
      route: ERoutes.AdminProductEdit,
      params: { alias },
    });
    navigate(path);
  };

  const handleProductDelete = (alias: string) => {
    const form = new FormData();
    form.append("alias", `${alias}`);
    form.append("_method", EProductAction.DeleteProduct);
    fetcher.submit(form, {
      method: EFormMethods.Delete,
      action: createPath({ route: ERoutes.AdminProducts, withIndex: true }),
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
    onDelete: handleProductDelete,
    pageOption: products.currentPage,
    sizeOption: products.pageSize,
  });

  useEffect(() => {
    if (fetcher.data && fetcher.data?.success) {
      notify.success({
        title: "Выполнено",
      });
    }

    if (fetcher.data && !fetcher.data?.success) {
      notify.error({
        title: "Ошибка",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, fetcher.data?.success]);

  return (
    <section className="Products">
      <div className="Products-Header">
        <div>
          <h1 className="Products-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>
              {t("pages.admin.products.title")}
            </Typography>
          </h1>
        </div>
        <div className="Products-HeaderControls">
          <SearchingPanel
            className="Products-SearchingPanel"
            defaultSearch={defaultSearch}
            isActive={isSearchActive}
            onBlur={onSearchBlur}
            onClick={onSearchFocus}
            onFocus={onSearchFocus}
            onKeyDown={onSearchKeyDown}
            onSubmit={onSearch}
          />
          <LinkButton
            className="Products-LinkButton"
            href="/admin/products/add"
          >
            {t("common.actions.add")}
          </LinkButton>
        </div>
      </div>
      <ProductsTable
        fieldsSortState={{
          columns: [
            ETableColumns.Alias,
            ETableColumns.CreatedAt,
            ETableColumns.ModifyDate,
            ETableColumns.Name,
          ],
          multiple: true,
          onChangeSorting: onSortTableByProperty,
        }}
        isLoading={isLoading}
        products={products}
        onChangePage={onChangePage}
        onChangePageSize={onChangeSize}
        onProductDelete={onClickDeleteIcon}
        onProductEdit={handleProductEdit}
      />
      <ModalDelete
        isOpen={deleteModal.isOpen}
        onClose={onCloseDeleteModal}
        onSubmit={onDeleteSubmit}
      />
    </section>
  );
};

export function productsLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...productAddLinks(),
    ...productEditLinks(),
    ...productsTableLinks(),
  ];
}
