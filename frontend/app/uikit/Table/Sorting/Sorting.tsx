import { useCallback, useState } from "react";
import type { ReactElement } from "react";
import { flexRender } from "@tanstack/react-table";
import type { Header } from "@tanstack/react-table";
import { useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import xor from "lodash/xor";
import { ETableSortDirection, ETypographyVariant, Icon, Popover, Typography } from "~/uikit";
import type { TTableSortingHandleChange } from "~/uikit";
import type { TSortingColumnStateWithReset } from "~/uikit/Table/TableHeader";
import { SortingHeader } from "./SortingHeader";
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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const headerId = header.id;
  const sortingState = multiple
    ? (state as Array<TSortingColumnStateWithReset>).find((item) => item.sortProperty === headerId)
    : (state as TSortingColumnStateWithReset);
  const isAlreadySorted = sortingState?.sortProperty === headerId;
  const hasColumnInArray = multiple && !!sortingState;
  const [searchParams] = useSearchParams();

  const checkSortingSearchParams = () => {
    const sort = searchParams.get("sort");
    const listSearchParams = sort && sort.split(",");
    const formattedListSearchParams =
      listSearchParams &&
      listSearchParams.map((item) => {
        const array = item.split("_");
        return {
          sortProperty: array[0],
          sortDirection: array[1].toUpperCase(),
        };
      });
    const findSearchParams =
      formattedListSearchParams &&
      formattedListSearchParams.find((item) => item.sortProperty === headerId);
    return findSearchParams ? findSearchParams.sortDirection : undefined;
  };

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

  const handlePopoverToggle = () => {
    setIsPopoverOpen((prevState) => !prevState);
  };

  const handleClickOutside = () => {
    setIsPopoverOpen(false);
  };

  const handleHideColumn = useCallback(() => {
    setHiddenColumns?.(xor(hiddenColumns, [header.column.id]));
  }, [header.column.id, hiddenColumns, setHiddenColumns]);

  const renderIconIndicator = () => {
    if (
      isAlreadySorted
        ? sortingState.sortDirection === ETableSortDirection.Asc
        : checkSortingSearchParams() && checkSortingSearchParams() === ETableSortDirection.Asc
    ) {
      return (
        <div>
          <Icon type="SortUp" />
        </div>
      );
    } else if (
      isAlreadySorted
        ? sortingState.sortDirection === ETableSortDirection.Desc
        : checkSortingSearchParams() && checkSortingSearchParams() === ETableSortDirection.Desc
    ) {
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

  const renderPopoverContent = () => {
    return (
      <ul className="Sorting-DropDownList">
        <li
          className={clsx("Sorting-DropDownListItem", {
            "Sorting-DropDownListItem__active":
              sortingState?.sortDirection === ETableSortDirection.Asc ||
              (checkSortingSearchParams() &&
                checkSortingSearchParams() === ETableSortDirection.Asc),
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
              sortingState?.sortDirection === ETableSortDirection.Desc ||
              (checkSortingSearchParams() &&
                checkSortingSearchParams() === ETableSortDirection.Desc),
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

        <li className="Sorting-DropDownListItem" onClick={handleHideColumn}>
          <Icon className="Sorting-DropDownListItem-Icon" type={"VisibilityOff"} />
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {optionsSorting?.hideColumnText ?? ""}
          </Typography>
        </li>
      </ul>
    );
  };

  return (
    <Popover
      content={renderPopoverContent()}
      isOpen={isPopoverOpen}
      onClickOutside={handleClickOutside}
      positions={["bottom"]}
    >
      <SortingHeader className="Sorting-Button" onClick={handlePopoverToggle}>
        <div className="Sorting-ButtonText">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
        {renderIconIndicator()}
      </SortingHeader>
    </Popover>
  );
};

export function sortingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
