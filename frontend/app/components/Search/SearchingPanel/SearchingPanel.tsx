import { ChangeEvent, FormEvent, KeyboardEvent, memo, MouseEvent } from "react";
import type { FC } from "react";
import { Form } from "@remix-run/react";
import clsx from "clsx";
import { EFormMethods } from "~/shared/form";
import { Icon } from "~/uikit";
import styles from "./SearchingPanel.module.css";

type TProps = {
  className?: string;
  defaultSearch?: string;
  isActive?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

const Component: FC<TProps> = ({
  className,
  defaultSearch,
  isActive,
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  onSubmit,
}) => {
  return (
    <div
      className={clsx("SearchingPanel", className, {
        SearchingPanel__active: isActive,
      })}
    >
      <Form className="SearchingPanel-Form" method={EFormMethods.Get} onChange={onSubmit}>
        <div className="SearchingPanel-InputWrapper">
          <input
            autoComplete="off"
            className="SearchingPanel-Input"
            defaultValue={defaultSearch}
            name="search"
            placeholder="Поиск"
            type="text"
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
          />
        </div>
        <Icon className="SearchingPanel-Icon" type="Search" />
      </Form>
    </div>
  );
};

export const SearchingPanel = memo(Component);

export function searchingPanelLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
