import { memo, useCallback } from "react";
import type { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import isNull from "lodash/isNull";
import { TSorting } from "~/types";
import { Select as SelectUi } from "~/uikit";
import type { TSelectProps as TSelectPropsUi } from "~/uikit";

type TSelectProps = TSelectPropsUi & {
  name: string;
};

const Component: FC<TSelectProps> = ({ defaultValue, name, ...props }) => {
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
    (selectedOption: TSorting | null) => {
      if (isNull(selectedOption)) return;
      field.onChange(selectedOption);
    },
    [field],
  );

  return <SelectUi {...props} name={field.name} onChange={handleChange} value={field.value} />;
};

export const Select = memo(Component);
