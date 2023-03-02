import type { ReactElement } from "react";
import { flexRender } from "@tanstack/react-table";
import type { Header } from "@tanstack/react-table";
import clsx from "clsx";
import { ETableSortDirection, ETypographyVariant, Icon, Popover, Typography } from "~/uikit";
import type { TTableSortingHandleChange } from "~/uikit";
import type { TSortingColumnStateWithReset } from "~/uikit/Table/TableHeader";
import styles from "./Sorting.module.css";

type TProps<T extends object> = {
  className?: string;
  header: Header<T, unknown>;
  hiddenColumns?: string[];
  multiple?: boolean;
  onChange: (
    value: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null,
  ) => void;
  optionsSorting?: {
    ascText?: string;
    descText?: string;
    hideColumnText?: string;
  };
  setHiddenColumns?: (hiddenColumns: string[]) => void;
  state: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null;
};

export const Sorting = <T extends object>({
  className,
  header,
  hiddenColumns,
  multiple,
  onChange,
  optionsSorting,
  setHiddenColumns,
  state,
}: TProps<T>): ReactElement => {
  const headerId = header.id;
  const sortingState = multiple
    ? (state as Array<TSortingColumnStateWithReset>).find((item) => item.sortProperty === headerId)
    : (state as TSortingColumnStateWithReset);
  const isAlreadySorted = sortingState?.sortProperty === headerId;
  const hasColumnInArray = multiple && !!sortingState;

  const handleChange = ({
    sortProperty,
    sortDirection,
    shouldReset,
    close,
  }: TTableSortingHandleChange) => {
    close?.();
    if (sortingState && sortProperty === sortingState.sortProperty && sortingState.shouldReset) {
      if (multiple) {
        onChange(
          (state as Array<TSortingColumnStateWithReset>).filter(
            (item) => item.sortProperty !== sortProperty,
          ),
        );
      } else {
        onChange(null);
      }

      return;
    }

    let preparedSortingParams: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> =
      { sortProperty, sortDirection, shouldReset };

    if (multiple) {
      preparedSortingParams = hasColumnInArray
        ? (state as Array<TSortingColumnStateWithReset>).map((item) =>
            item.sortProperty === sortProperty
              ? { sortProperty, sortDirection, shouldReset }
              : item,
          )
        : (state as Array<TSortingColumnStateWithReset>).concat([
            { sortDirection, sortProperty, shouldReset },
          ]);
    }

    onChange(preparedSortingParams);
  };

  const renderIconIndicator = () => {
    if (isAlreadySorted && sortingState.sortDirection === ETableSortDirection.Asc) {
      return (
        <div>
          <Icon type="SortUp" />
        </div>
      );
    } else if (isAlreadySorted && sortingState.sortDirection === ETableSortDirection.Desc) {
      return (
        <div>
          <Icon type="SortDown" />
        </div>
      );
    } else {
      return (
        <div>
          <Icon type="Sorting" />
        </div>
      );
    }
  };

  return (
    <Popover className="Sorting">
      <Popover.Button>
        <div className="Sorting-ButtonText">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
        {renderIconIndicator()}
      </Popover.Button>
      <Popover.Panel>
        <ul>
          <li
            className={clsx("Sorting-DropDownListItem", {
              "Sorting-DropDownListItem__active":
                sortingState?.sortDirection === ETableSortDirection.Asc,
            })}
            onClick={() =>
              handleChange({
                sortProperty: headerId,
                sortDirection: ETableSortDirection.Asc,
              })
            }
          >
            <Icon className="Sorting-DropDownListItem-Icon" type={"SortUp"} />
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {optionsSorting?.ascText ?? ""}
            </Typography>
          </li>

          <li
            className={clsx("Sorting-DropDownListItem", {
              "Sorting-DropDownListItem__active":
                sortingState?.sortDirection === ETableSortDirection.Desc,
            })}
            onClick={() =>
              handleChange({
                sortProperty: headerId,
                sortDirection: ETableSortDirection.Desc,
              })
            }
          >
            <Icon className="Sorting-DropDownListItem-Icon" type={"SortDown"} />
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {optionsSorting?.descText ?? ""}
            </Typography>
          </li>
        </ul>
      </Popover.Panel>
    </Popover>
  );
};

export function sortingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
