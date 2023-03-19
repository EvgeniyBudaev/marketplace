import { memo } from "react";
import type { FC } from "react";
import type { OnChangeValue } from "react-select";
import isNil from "lodash/isNil";
import { Select, ETheme } from "~/uikit";
import type { TSelectOption, isSelectMultiType } from "~/uikit";
import { getPageSizeOptions } from "~/uikit/Table/PageSize";

type TProps = {
  defaultPageSize: number;
  options: number[];
  onChangePageSize: (pageSize: number) => void;
  theme?: ETheme;
};

const Component: FC<TProps> = ({
  defaultPageSize,
  options,
  onChangePageSize,
  theme = ETheme.Light,
}) => {
  const selectOptions = getPageSizeOptions(options);

  const handleChangePageSize = (options?: OnChangeValue<TSelectOption, isSelectMultiType>) => {
    if (isNil(options)) return;
    if (Array.isArray(options)) {
      onChangePageSize(Number(options[0].value));
    } else {
      const optionsSingle = options as TSelectOption;
      onChangePageSize(Number(optionsSingle.value));
    }
  };

  return (
    <div>
      <Select
        isMulti={false}
        name="pagination"
        options={selectOptions}
        theme={theme}
        value={selectOptions.find((option) => option.value === defaultPageSize.toString())}
        onChange={handleChangePageSize}
      />
    </div>
  );
};

export const PageSize = memo(Component);
