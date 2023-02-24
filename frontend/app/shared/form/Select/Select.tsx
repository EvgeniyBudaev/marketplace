import { memo, useCallback } from "react";
import type { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { OnChangeValue } from "react-select";
import isNull from "lodash/isNull";
import { Select as SelectUi } from "~/uikit";
import type { TSelectProps as TSelectPropsUi, isSelectMultiType, TSelectOption } from "~/uikit";

type TSelectProps = TSelectPropsUi & {
  isMulti?: isSelectMultiType;
  name: string;
};

const Component: FC<TSelectProps> = ({ defaultValue, isMulti, name, ...props }) => {
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
    },
    [field],
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
