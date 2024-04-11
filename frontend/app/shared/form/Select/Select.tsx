import { memo, useCallback } from "react";
import type { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { OnChangeValue } from "react-select";
import isNull from "lodash/isNull.js";
import { Select as SelectUi } from "#app/uikit";
import type {
  TSelectProps as TSelectPropsUi,
  isSelectMultiType,
  TSelectOption,
} from "#app/uikit";

type TSelectProps = TSelectPropsUi & {
  isMulti?: isSelectMultiType;
  name: string;
  onChange?: (
    selectedOption: OnChangeValue<TSelectOption, isSelectMultiType>
  ) => void;
};

const Component: FC<TSelectProps> = ({
  defaultValue,
  isMulti,
  name,
  onChange,
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const handleChange = useCallback(
    (selectedOption: OnChangeValue<TSelectOption, isSelectMultiType>) => {
      if (isNull(selectedOption)) return;
      field.onChange(selectedOption);
      onChange?.(selectedOption);
    },
    [field]
  );

  return (
    <SelectUi
      {...props}
      isMulti={isMulti}
      name={field.name}
      onChange={handleChange}
      value={field.value}
    />
  );
};

export const Select = memo(Component);
