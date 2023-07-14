import {useContext, useEffect, useState} from "react";
import type {FC} from "react";
import type {OnChangeValue} from "react-select";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import isNil from "lodash/isNil";

import {ThemeSwitcher} from "~/components";
import {SOCKET_RECEIVE_LANGUAGE, SOCKET_SEND_LANGUAGE} from "~/constants";
import {useLanguage, useTheme} from "~/hooks";
import {
  SettingSelectControl,
  settingSelectControlLinks,
} from "~/pages/Settings/SettingSelectControl";
import {
  SettingSelectOption,
  settingSelectOptionLinks,
} from "~/pages/Settings/SettingSelectOption";
import {SocketContext} from "~/shared/context";
import {ELanguages, ETypographyVariant, Icon, Select, Typography} from "~/uikit";
import type {isSelectMultiType, TSelectOption} from "~/uikit";
import styles from "./Settings.css";

export const Settings: FC = () => {
  const {language, onChangeLanguage} = useLanguage();
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_RECEIVE_LANGUAGE, (data) => {
      console.log("socket_receive_language: ", data);
      onChangeLanguage?.(data);
    });
  }, [onChangeLanguage, socket]);

  const options = [
    {
      value: ELanguages.Ru,
      label: t("pages.settings.language.options.ru"),
      prefixIcon: <Icon type="RussianLanguage"/>,
    },
    {
      value: ELanguages.En,
      label: t("pages.settings.language.options.en"),
      prefixIcon: <Icon type="EnglishLanguage"/>,
    },
  ];

  const handleChangeLanguage = (selectedOption?: OnChangeValue<TSelectOption, isSelectMultiType>) => {
    if (isNil(selectedOption)) return;
    if (Array.isArray(selectedOption)) {
      socket && socket.emit(SOCKET_SEND_LANGUAGE, selectedOption[0].value);
      // onChangeLanguage?.(selectedOption[0].value);
    } else {
      const selectedOptionSingle = selectedOption as TSelectOption;
      socket && socket.emit(SOCKET_SEND_LANGUAGE, selectedOptionSingle.value as ELanguages);
      // onChangeLanguage?.(selectedOptionSingle.value as ELanguages);
    }
  };

  const handleBlurLanguage = () => {
    setIsSelectOpened(false);
  };

  const handleFocusLanguage = () => {
    setIsSelectOpened(true);
  };

  return (
    <section className="Settings">
      <h1 className="Settings-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>{t("pages.settings.title")}</Typography>
      </h1>
      <div className="Settings-SubTitle">
        <Typography variant={ETypographyVariant.TextH6Medium}>
          {t("pages.settings.languageSwitcher")}
        </Typography>
      </div>
      <div className="Settings-Block">
        <Select
          className={clsx("Settings-Select", {
            "Settings-Select__active": isSelectOpened,
          })}
          components={{Control: SettingSelectControl, Option: SettingSelectOption}}
          isMulti={false}
          onBlur={handleBlurLanguage}
          onChange={handleChangeLanguage}
          onFocus={handleFocusLanguage}
          options={options}
          theme={theme}
          value={options.find((option) => option.value === language)!}
        />
      </div>
      <div className="Settings-SubTitle">
        <Typography variant={ETypographyVariant.TextH6Medium}>
          {t("pages.settings.themeSwitcher")}
        </Typography>
      </div>
      <div className="Settings-Block">
        <ThemeSwitcher/>
      </div>
    </section>
  );
};

export function settingsLinks() {
  return [
    {rel: "stylesheet", href: styles},
    ...settingSelectOptionLinks(),
    ...settingSelectControlLinks(),
  ];
}
