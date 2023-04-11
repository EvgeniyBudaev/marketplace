import { useEffect, useState } from "react";
import type { FC } from "react";
import type { OnChangeValue } from "react-select";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { useLanguage, useTheme } from "~/hooks";
import {
  SettingSelectControl,
  settingSelectControlLinks,
} from "~/pages/Settings/SettingSelectControl";
import {
  SettingSelectOption,
  settingSelectOptionLinks,
} from "~/pages/Settings/SettingSelectOption";
import { ELanguages, ETypographyVariant, Icon, Select, Typography } from "~/uikit";
import type { isSelectMultiType, TSelectOption } from "~/uikit";
import styles from "./Settings.css";

export const Settings: FC = () => {
  const { language, onChangeLanguage } = useLanguage();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [isSelectOpened, setIsSelectOpened] = useState(false);

  const options = [
    {
      value: ELanguages.Ru,
      label: t("pages.settings.language.options.ru"),
      prefixIcon: <Icon type="RussianLanguage" />,
    },
    {
      value: ELanguages.En,
      label: t("pages.settings.language.options.en"),
      prefixIcon: <Icon type="EnglishLanguage" />,
    },
  ];

  const handleChange = (selectedOption?: OnChangeValue<TSelectOption, isSelectMultiType>) => {
    if (isNil(selectedOption)) return;
    if (Array.isArray(selectedOption)) {
      onChangeLanguage?.(selectedOption[0].value);
    } else {
      const selectedOptionSingle = selectedOption as TSelectOption;
      onChangeLanguage?.(selectedOptionSingle.value as ELanguages);
    }
  };

  const handleBlur = () => {
    setIsSelectOpened(false);
  };

  const handleFocus = () => {
    setIsSelectOpened(true);
  };

  return (
    <section className="Settings">
      <h1 className="Settings-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>{t("pages.settings.title")}</Typography>
      </h1>
      <div>
        <Select
          className={clsx("Settings-Select", {
            "Settings-Select__active": isSelectOpened,
          })}
          components={{ Control: SettingSelectControl, Option: SettingSelectOption }}
          isMulti={false}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          options={options}
          theme={theme}
          value={options.find((option) => option.value === language)!}
        />
      </div>
    </section>
  );
};

export function settingsLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...settingSelectOptionLinks(),
    ...settingSelectControlLinks(),
  ];
}
