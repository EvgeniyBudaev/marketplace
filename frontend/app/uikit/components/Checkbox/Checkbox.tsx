import clsx from "clsx";
import { memo } from "react";
import type { ChangeEvent, FC, ReactNode } from "react";
import { ETypographyVariant, Icon, Typography } from "#app/uikit";
import styles from "./Checkbox.css";

export type TCheckboxProps = {
  checked?: boolean;
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  defaultChecked?: boolean;
  id: string;
  label: string;
  name: string;
  nameGroup: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    nameGroup: string
  ) => void;
};

export const CheckboxComponent: FC<TCheckboxProps> = ({
  checked,
  children,
  className,
  dataTestId = "uikit__checkbox",
  defaultChecked,
  id,
  label,
  name,
  nameGroup,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event, id, nameGroup);
  };

  return (
    <div
      className={clsx("Checkbox-Wrapper", className)}
      data-testid={dataTestId}
    >
      <input
        className="Checkbox"
        defaultChecked={defaultChecked}
        id={id}
        type="checkbox"
        name={name}
        value={id}
        checked={checked}
        onChange={handleChange}
      />
      {label && (
        <label className="Checkbox-Label" htmlFor={id}>
          <Icon className="Checkbox-Icon" type="Checkbox" />
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {label}
          </Typography>
        </label>
      )}
      {children && <span className="Checkbox-Description">{children}</span>}
    </div>
  );
};

export const Checkbox = memo(CheckboxComponent);

export function checkboxLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
