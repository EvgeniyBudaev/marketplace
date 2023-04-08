import { memo } from "react";
import type { FC } from "react";
import { PageSize, pageSizeLinks } from "~/uikit/Table/PageSize";
import { Pagination } from "~/uikit";
import type { ETheme } from "~/uikit";
import styles from "./NavigationPanel.module.css";

type TProps = {
  currentPage?: number;
  defaultPageSize: number;
  onChangePageSize: (pageSize: number) => void;
  onPageChange?: ({ selected }: { selected: number }) => void;
  pagesCount?: number;
  pageSizeOptions: number[];
  theme?: ETheme;
};

const Component: FC<TProps> = ({
  currentPage,
  defaultPageSize,
  onChangePageSize,
  onPageChange,
  pagesCount,
  pageSizeOptions,
  theme,
}) => {
  return (
    <div className="NavigationPanel">
      <PageSize
        defaultPageSize={defaultPageSize}
        options={pageSizeOptions}
        onChangePageSize={onChangePageSize}
        theme={theme}
      />
      {currentPage && pagesCount && onPageChange && (
        <Pagination forcePage={currentPage - 1} pagesCount={pagesCount} onChange={onPageChange} />
      )}
      <div />
    </div>
  );
};

export const NavigationPanel = memo(Component);

export function navigationPanelLinks() {
  return [{ rel: "stylesheet", href: styles }, ...pageSizeLinks()];
}
