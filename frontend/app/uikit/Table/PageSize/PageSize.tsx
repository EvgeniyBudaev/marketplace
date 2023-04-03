import { memo, useState } from "react";
import type { FC } from "react";
import type { OnChangeValue } from "react-select";
import isNil from "lodash/isNil";
import { Select, ETheme } from "~/uikit";
import type { TSelectOption, isSelectMultiType } from "~/uikit";
import { getPageSizeOptions } from "~/uikit/Table/PageSize";
import clsx from "clsx";

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
  const [isSelectOpened, setIsSelectOpened] = useState(false);
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

  const handleBlur = () => {
    setIsSelectOpened(false);
  };

  const handleFocus = () => {
    setIsSelectOpened(true);
  };

  return (
    <div>
      <Select
        className={clsx("Sorting-Select", {
          "Sorting-Select__active": isSelectOpened,
        })}
        isMulti={false}
        name="pagination"
        options={selectOptions}
        theme={theme}
        value={selectOptions.find((option) => option.value === defaultPageSize.toString())}
        onBlur={handleBlur}
        onChange={handleChangePageSize}
        onFocus={handleFocus}
      />
    </div>
  );
};

export const PageSize = memo(Component);
