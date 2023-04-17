import { memo } from "react";
import type { FC, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";

import { EFormFields, formSchema } from "~/components/search";
import type { TForm } from "~/components/search";
import { EFormMethods, Form, useInitForm } from "~/shared/form";
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
  const { t } = useTranslation();
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
            placeholder={t("common.actions.search") ?? "Search"}
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
