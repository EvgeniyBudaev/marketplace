import { ChangeEvent, FormEvent, FormEventHandler, KeyboardEvent, memo, MouseEvent } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { EFormFields, formSchema, TForm } from "~/components/search";
import { EFormMethods, Form, useInitForm } from "~/shared/form";
import { Icon } from "~/uikit";
import styles from "./SearchingPanel.module.css";
import { TParams } from "~/types";

type TProps = {
  className?: string;
  defaultSearch?: string;
  isActive?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onSubmit?: (event: ChangeEvent<HTMLFormElement>) => void;
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
  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div
      className={clsx("SearchingPanel", className, {
        SearchingPanel__active: isActive,
      })}
    >
      <Form<TForm>
        form={form}
        className="SearchingPanel-Form"
        method={EFormMethods.Get}
        onChange={onSubmit}
      >
        <div className="SearchingPanel-InputWrapper">
          <input
            autoComplete="off"
            className="SearchingPanel-Input"
            defaultValue={defaultSearch}
            name={EFormFields.Search}
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
