import { forwardRef, memo, useCallback, useState } from "react";
import { ERoutes } from "~/enums";
import { FetcherWithComponents } from "@remix-run/react";
import { TDeleteModalState, useGetColumns } from "~/pages/Admin/Attributes/SelectableTable";
import { SelectableDeleteModal } from "~/pages/Admin/Attributes/SelectableDeleteModal";
import { ESelectableValueAction, TAttributeDetail, TSelectableItem } from "~/shared/api/attributes";
import { createColumnHelper, Table as UiTable } from "~/uikit";
import { EFormMethods } from "~/shared/form";
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
          route: ERoutes.AttributeEdit,
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
          totalItemsTitle={"Всего значений"}
        />
        <SelectableDeleteModal
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
