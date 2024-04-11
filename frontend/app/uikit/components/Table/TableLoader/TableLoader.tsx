import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { Spinner } from "#app/uikit";
import styles from "./TableLoader.css";

type TProps = {};

const TableLoaderComponent = (
  _props: TProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div className="TableLoader">
      <div className="TableLoader-Inner" ref={ref}>
        <Spinner />
      </div>
    </div>
  );
};

export const TableLoader = forwardRef(TableLoaderComponent);

export function tableLoaderLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
