import { forwardRef, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FetcherWithComponents } from "@remix-run/react";
import { ModalDelete } from "~/components/modal";
import { ERoutes } from "~/enums";
import type { TDeleteModalState } from "~/pages/Admin/Attributes/SelectableTable";
import { useGetColumns } from "~/pages/Admin/Attributes/SelectableTable";
import type { TAttributeDetail, TSelectableItem } from "~/shared/api/attributes";
import { ESelectableValueAction } from "~/shared/api/attributes";
import { EFormMethods } from "~/shared/form";
import { createColumnHelper, Table as UiTable } from "~/uikit";
import { createPath } from "~/utils";

type TProps = {
  attribute: TAttributeDetail;
  fetcher: FetcherWithComponents<any>;
  items: TSelectableItem[];
  onChangePage?: ({ selected }: { selected: number }) => void;
  onChangeSelectableValue: ({ id, value }: { id: number; value: string }) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  ({ attribute, fetcher, items, onChangePage, onChangeSelectableValue }, ref) => {
    const { t } = useTranslation();
    const [deleteModal, setDeleteModal] = useState<TDeleteModalState>({ isOpen: false });

    const handleClickDeleteSelectableValue = useCallback(
      (id: number) => {
        setDeleteModal({
          isOpen: true,
          id,
        });
      },
      [setDeleteModal],
    );

    const columnHelper = createColumnHelper<TSelectableItem>();
    const columns = useGetColumns(
      columnHelper,
      onChangeSelectableValue,
      handleClickDeleteSelectableValue,
    );

    const handleCloseDeleteModal = () => {
      setDeleteModal((prev) => ({ ...prev, isOpen: false }));
    };

    const handleDelete = (id: number) => {
      const form = new FormData();
      form.append("id", `${id}`);
      form.append("_method", ESelectableValueAction.DeleteSelectableValue);
      fetcher.submit(form, {
        method: EFormMethods.Delete,
        action: createPath({
          route: ERoutes.AdminAttributeEdit,
          params: { alias: attribute.alias },
          withIndex: true,
        }),
      });
    };

    const handleSubmitDeleteModal = () => {
      if (deleteModal.id) {
        handleDelete(deleteModal.id);
        handleCloseDeleteModal();
      }
    };

    return (
      <div ref={ref}>
        <UiTable<TSelectableItem>
          columns={columns}
          currentPage={1}
          data={items}
          getId={(row) => row.id}
          onPageChange={onChangePage}
          pagesCount={1}
          totalItems={items.length}
          totalItemsTitle={t("pages.admin.attributeEdit.table.header") ?? "Total values"}
        />
        <ModalDelete
          isOpen={deleteModal.isOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={handleSubmitDeleteModal}
        />
      </div>
    );
  },
);

TableComponent.displayName = "SelectableTableComponent";

export const SelectableTable = memo(TableComponent);
