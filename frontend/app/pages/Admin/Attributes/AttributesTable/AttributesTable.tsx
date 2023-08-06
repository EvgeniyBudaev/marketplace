import { forwardRef, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EPermissions } from "~/enums";
import { useTheme, useUser } from "~/hooks";
import { useGetColumns } from "~/pages/Admin/Attributes/AttributesTable";
import type { TTableColumn } from "~/pages/Admin/Attributes/AttributesTable/types";
import type { TAttributes, TAttribute } from "~/shared/api/attributes";
import { createColumnHelper, Icon, Table as UiTable } from "~/uikit";
import type { TTableSortingProps } from "~/uikit";
import type { TTableRowActions } from "~/uikit/components/Table/types";
import { checkPermission } from "~/utils";
import styles from "./AttributesTable.css";

type TProps = {
  attributes: TAttributes;
  fieldsSortState: TTableSortingProps;
  isLoading?: boolean;
  onAttributeDelete?: (alias: string) => void;
  onAttributeEdit?: (alias: string) => void;
  onChangePage: ({ selected }: { selected: number }) => void;
  onChangePageSize: (pageSize: number) => void;
};

const TableComponent = forwardRef<HTMLDivElement, TProps>(
  (
    {
      attributes,
      fieldsSortState,
      isLoading,
      onAttributeDelete,
      onAttributeEdit,
      onChangePage,
      onChangePageSize,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { user } = useUser();
    const columnHelper = createColumnHelper<TAttribute>();
    const columns = useGetColumns(columnHelper);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const { theme } = useTheme();

    const { content, countOfPage, countOfResult, currentPage, pageSize } = attributes;

    const settingsProps = useMemo(
      () => ({
        options: {
          hiddenColumns,
          setHiddenColumns,
          optionsCancelText: t("common.actions.cancel"),
          optionsChangeText: t("common.actions.apply"),
          optionsFieldHeader: t("common.table.options.fields"),
          optionsModalHeader: t("common.table.options.modal"),
          optionsSorting: {
            ascText: t("common.table.options.sorting.asc"),
            defaultText: t("common.table.options.sorting.default"),
            descText: t("common.table.options.sorting.desc"),
            hideColumnText: t("common.table.options.sorting.hide"),
          },
        },
      }),
      [hiddenColumns, t],
    );

    const handleAttributeEdit = ({ alias }: TTableColumn) => {
      onAttributeEdit?.(alias);
    };

    const handleAttributeDelete = ({ alias }: TTableColumn) => {
      onAttributeDelete?.(alias);
    };

    const rowActions: TTableRowActions<TTableColumn> = [
      {
        icon: <Icon type="Trash" />,
        title: t("common.actions.delete"),
        onClick: handleAttributeDelete,
        permission: [EPermissions.Administrator],
      },
      {
        icon: <Icon type="Edit" />,
        title: t("common.actions.edit"),
        onClick: handleAttributeEdit,
        permission: [EPermissions.Administrator],
      },
    ].filter(({ permission }) => checkPermission(user?.permissions ?? null, permission));

    return (
      <div ref={ref}>
        <UiTable<TAttribute>
          columns={columns}
          currentPage={currentPage}
          data={content}
          defaultPageSize={pageSize}
          getId={(row) => row.alias}
          isLoading={isLoading}
          messages={{ notFound: t("common.info.noData") }}
          onChangePageSize={onChangePageSize}
          onPageChange={onChangePage}
          pagesCount={countOfPage}
          rowActions={rowActions}
          settings={settingsProps}
          sorting={fieldsSortState}
          sticky={true}
          theme={theme}
          totalItems={countOfResult}
          totalItemsTitle={t("pages.admin.attributes.table.header") ?? "Total attributes"}
        />
      </div>
    );
  },
);

TableComponent.displayName = "AttributesTableComponent";

export const AttributesTable = memo(TableComponent);

export function attributesTableLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
