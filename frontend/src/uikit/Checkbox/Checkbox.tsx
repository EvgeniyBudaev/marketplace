import React, { memo, ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "src/uikit";
import classes from "./Checkbox.module.scss";

type TValue = {
  category: string[];
  form: string[];
};

type TProps = {
  className?: string;
  id: string;
  label: string;
  nameGroup: string;
  checkedBox: TValue;
  children?: ReactNode;
  onClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    nameGroup: string
  ) => void;
};

export const CheckboxComponent: React.FC<TProps> = ({
  className,
  id,
  label,
  nameGroup,
  checkedBox,
  children,
  onClick,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onClick(event, nameGroup);
  };

  return (
    <div className={clsx(classes.CheckboxWrapper, className)}>
      <input
        className={classes.Checkbox}
        id={id}
        type="checkbox"
        name={label}
        value={label}
        checked={
          checkedBox && checkedBox[nameGroup as keyof TValue].includes(label)
        }
        onChange={handleChange}
      />
      {label && (
        <label className={classes.Label} htmlFor={id}>
          <Icon className={classes.CheckboxIcon} type="Checkbox" />
          {label}
        </label>
      )}
      {children && <span className={classes.Description}>{children}</span>}
    </div>
  );
};

export const Checkbox = memo(CheckboxComponent);
