import {forwardRef, memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import type {FetcherWithComponents} from "@remix-run/react";
import {ModalDelete} from "~/components/modal";
import {ERoutes} from "~/enums";
import {SelectableEditModal} from "~/pages/Admin/Attributes/SelectableEditModal";
import type {TDeleteModalState, TEditModalState} from "~/pages/Admin/Attributes/SelectableTable";
import {useGetColumns} from "~/pages/Admin/Attributes/SelectableTable";
import type {TAttributeDetail, TSelectableItem} from "~/shared/api/attributes";
import {ESelectableValueAction} from "~/shared/api/attributes";
import {EFormMethods} from "~/shared/form";
import {createColumnHelper, Table as UiTable} from "~/uikit";
import {createPath} from "~/utils";

type TProps = {
  attribute: TAttributeDetail;
  csrf: string;
  fetcher: FetcherWithComponents<any>;
  items: TSelectableItem[];
  onChangePage?: ({selected}: { selected: number }) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  ({attribute, csrf, fetcher, items, onChangePage}, ref) => {
    const {t} = useTranslation();
    const [deleteModal, setDeleteModal] = useState<TDeleteModalState>({isOpen: false});
    const [editModal, setEditModal] = useState<TEditModalState>({isOpen: false});

    const handleClickDeleteSelectableValue = useCallback(
      (id: number) => {
        setDeleteModal({
          isOpen: true,
          id,
        });
      },
      [setDeleteModal],
    );

    const handleClickEditSelectableValue = useCallback(
      (id: number, defaultValue: string) => {
        setEditModal({
          isOpen: true,
          id,
          defaultValue,
        });
      },
      [setEditModal],
    );

    const columnHelper = createColumnHelper<TSelectableItem>();
    const columns = useGetColumns({
        columnHelper,
        onDelete: handleClickDeleteSelectableValue,
        onEdit: handleClickEditSelectableValue,
      }
    );

    const handleCloseDeleteModal = () => {
      setDeleteModal((prev) => ({...prev, isOpen: false}));
    };

    const handleCloseEditModal = () => {
      setEditModal((prev) => ({...prev, isOpen: false}));
    };

    const handleSubmitDeleteModal = () => {
      if (deleteModal.id) {
        const formattedParams = {
          id: deleteModal.id.toString(),
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
        handleCloseDeleteModal();
      }
    };

    const handleSubmitEditModal = ({id, value}: { id: number; value: string }) => {
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
      handleCloseDeleteModal();
    }

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
        <SelectableEditModal
          defaultValue={editModal.defaultValue}
          id={editModal.id}
          isOpenModal={editModal.isOpen}
          onModalClose={handleCloseEditModal}
          onSubmit={handleSubmitEditModal}
        />
      </div>
    );
  },
);

TableComponent.displayName = "SelectableTableComponent";

export const SelectableTable = memo(TableComponent);
