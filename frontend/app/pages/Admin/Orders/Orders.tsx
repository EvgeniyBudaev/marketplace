import { useEffect } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useNavigate } from "@remix-run/react";

import { ModalDelete } from "~/components/modal";
import { SearchingPanel } from "~/components/search";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/constants";
import { ERoutes } from "~/enums";
import { useTable } from "~/hooks";
import { OrdersTable, ordersTableLinks, ETableColumns } from "~/pages/Admin/Orders/OrdersTable";
// import { EOrderAction } from "~/shared/api/orders";
import type { TOrderList } from "~/shared/api/orders";
import { getFetcherOptions } from "~/shared/fetcher";
// import { EFormMethods } from "~/shared/form";
import { ETypographyVariant, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./Orders.css";

type TProps = {
  orders: TOrderList;
};

export const Orders: FC<TProps> = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { isLoading } = getFetcherOptions(fetcher);
  const orders: TOrderList = fetcher.data?.orders ?? props.orders;

  const handleOrderEdit = (id: number) => {
    const path = createPath({
      route: ERoutes.AdminOrderEdit,
      params: { id },
    });
    navigate(path);
  };

  // const handleOrderDelete = (id: number) => {
  //   const form = new FormData();
  //   form.append("id", `${id}`);
  //   form.append("_method", EOrderAction.DeleteOrder);
  //   fetcher.submit(form, {
  //     method: EFormMethods.Delete,
  //     action: createPath({ route: ERoutes.AdminOrders, withIndex: true }),
  //   });
  // };

  const {
    defaultSearch,
    deleteModal,
    isSearchActive,
    onChangePage,
    onChangeSize,
    // onClickDeleteIcon,
    onCloseDeleteModal,
    onDeleteSubmit,
    onSearch,
    onSearchBlur,
    onSearchFocus,
    onSearchKeyDown,
    onSortTableByProperty,
  } = useTable({
    // onDelete: handleOrderDelete,
    pageOption: orders?.currentPage ?? DEFAULT_PAGE,
    sizeOption: orders?.pageSize ?? DEFAULT_PAGE_SIZE,
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
    <section className="Orders">
      <div className="Orders-Header">
        <div>
          <h1 className="Orders-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>
              {t("pages.admin.orders.title")}
            </Typography>
          </h1>
        </div>
        <div className="Orders-HeaderControls">
          <SearchingPanel
            className="Orders-SearchingPanel"
            defaultSearch={defaultSearch}
            isActive={isSearchActive}
            onBlur={onSearchBlur}
            onClick={onSearchFocus}
            onFocus={onSearchFocus}
            onKeyDown={onSearchKeyDown}
            onSubmit={onSearch}
          />
        </div>
      </div>
      <OrdersTable
        orders={orders}
        fieldsSortState={{
          columns: [
            ETableColumns.CreatedAt,
            ETableColumns.Id,
            ETableColumns.ModifyDate,
            ETableColumns.OrderAmount,
            ETableColumns.RecipientEmail,
            ETableColumns.Status,
          ],
          multiple: true,
          onChangeSorting: onSortTableByProperty,
        }}
        isLoading={isLoading}
        onOrderEdit={handleOrderEdit}
        // onOrderDelete={onClickDeleteIcon}
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

export function ordersLinks() {
  return [{ rel: "stylesheet", href: styles }, ...ordersTableLinks()];
}
