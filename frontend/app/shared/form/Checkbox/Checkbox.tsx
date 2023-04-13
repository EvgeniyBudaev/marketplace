import { memo, useEffect } from "react";
import type { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Checkbox as CheckboxUi } from "~/uikit";
import type { TCheckboxProps as TCheckboxPropsUi } from "~/uikit";

type TProps = TCheckboxPropsUi & {
  checked?: boolean;
  name: string;
};

const CheckboxComponent: FC<TProps> = ({ checked, defaultChecked = false, name, ...props }) => {
  const { control, setValue } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: defaultChecked,
  });

  useEffect(() => {
    setValue(name, checked);
  }, [checked]);

  return <CheckboxUi {...props} checked={checked} name={field.name} />;
};

export const Checkbox = memo(CheckboxComponent);
