import {memo} from "react";
import type {FC} from "react";
import clsx from "clsx";
import type {ETablePlacement} from "~/uikit/components/Table/enums";
import {PageSize, pageSizeLinks} from "~/uikit/components/Table/PageSize";
import {Pagination} from "~/uikit";
import type {ETheme} from "~/uikit";
import styles from "./NavigationPanel.css";

type TProps = {
  className?: string;
  currentPage?: number;
  defaultPageSize: number;
  dropdownPosition?: ETablePlacement;
  onChangePageSize: (pageSize: number) => void;
  onPageChange?: ({selected}: { selected: number }) => void;
  pagesCount?: number;
  pageSizeOptions: number[];
  theme?: ETheme;
};

const Component: FC<TProps> = ({
                                 className,
                                 currentPage,
                                 defaultPageSize,
                                 dropdownPosition,
                                 onChangePageSize,
                                 onPageChange,
                                 pagesCount,
                                 pageSizeOptions,
                                 theme,
                               }) => {
  return (
    <div className={clsx("NavigationPanel", className)}>
      <PageSize
        defaultPageSize={defaultPageSize}
        dropdownPosition={dropdownPosition}
        options={pageSizeOptions}
        onChangePageSize={onChangePageSize}
        theme={theme}
      />
      {currentPage && pagesCount && onPageChange && (
        <Pagination
          forcePage={currentPage - 1}
          pagesCount={pagesCount}
          onChange={onPageChange}
          theme={theme}
        />
      )}
      <div/>
    </div>
  );
};

export const NavigationPanel = memo(Component);

export function navigationPanelLinks() {
  return [{rel: "stylesheet", href: styles}, ...pageSizeLinks()];
}
