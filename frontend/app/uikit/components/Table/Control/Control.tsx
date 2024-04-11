import { memo } from "react";
import type { ReactElement } from "react";
import { Options } from "#app/uikit/components/Table/Options";
import type { TTableOptionsProps } from "#app/uikit/components/Table/Options";

type TProps<T extends object> = {
  options?: Omit<TTableOptionsProps<T>, "columns">;
  columns: TTableOptionsProps<T>["columns"];
};

const Component = <T extends object>({
  options,
  columns,
}: TProps<T>): ReactElement => {
  return <div>{options && <Options {...options} columns={columns} />}</div>;
};

export const Control = memo(Component) as typeof Component;
