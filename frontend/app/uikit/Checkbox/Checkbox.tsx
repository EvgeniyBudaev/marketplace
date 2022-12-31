import { memo } from "react";
import type { ChangeEvent, FC, ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "~/uikit";
import styles from "./Checkbox.module.css";

type TValue = {
  [key: string]: string[];
};

type TProps = {
  className?: string;
  id: string;
  label: string;
  name: string;
  nameGroup: string;
  checkedBox: TValue;
  children?: ReactNode;
  onClick: (event: ChangeEvent<HTMLInputElement>, id: string, nameGroup: string) => void;
};

export const CheckboxComponent: FC<TProps> = ({
  className,
  id,
  label,
  name,
  nameGroup,
  checkedBox,
  children,
  onClick,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onClick(event, id, nameGroup);
  };

  return (
    <div className={clsx("Checkbox-Wrapper", className)}>
      <input
        className="Checkbox"
        id={id}
        type="checkbox"
        name={name}
        value={id}
        checked={checkedBox && checkedBox[nameGroup as keyof TValue].includes(id)}
        onChange={handleChange}
      />
      {label && (
        <label className="Checkbox-Label" htmlFor={id}>
          <Icon className="Checkbox-Icon" type="Checkbox" />
          {label}
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
