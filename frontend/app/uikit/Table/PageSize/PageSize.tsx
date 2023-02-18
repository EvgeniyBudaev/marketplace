import { memo } from "react";
import type { FC } from "react";
import isNull from "lodash/isNull";
import { Select } from "~/uikit";
import type { TSelectOption } from "~/uikit";
import { getPageSizeOptions } from "~/uikit/Table/PageSize";

type TProps = {
  defaultPageSize: number;
  options: number[];
  onChangePageSize: (pageSize: number) => void;
};

const Component: FC<TProps> = ({ defaultPageSize, options, onChangePageSize }) => {
  const selectOptions = getPageSizeOptions(options);

  const handleChangePageSize = (options: TSelectOption | null) => {
    if (isNull(options)) return;
    onChangePageSize(Number(options.value));
  };

  return (
    <div>
      <Select
        name="pagination"
        options={selectOptions}
        theme={"primary"}
        value={selectOptions.find((option) => option.value === defaultPageSize.toString())}
        onChange={handleChangePageSize}
      />
    </div>
  );
};

export const PageSize = memo(Component);
