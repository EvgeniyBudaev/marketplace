import { components } from "react-select";
import { useLanguage } from "#app/hooks";
import { ELanguages, Icon } from "#app/uikit";
import styles from "./SettingSelectControl.css";

export const SettingSelectControl = ({ children, ...props }: any) => {
  const { language } = useLanguage();
  return (
    <components.Control {...props}>
      <div className="SettingSelectControl">
        <div className="SettingSelectControl-Icon">
          {language === ELanguages.Ru ? (
            <Icon type="RussianLanguage" />
          ) : (
            <Icon type="EnglishLanguage" />
          )}
        </div>
        <span className="SettingSelectControl-Children">{children}</span>
      </div>
    </components.Control>
  );
};

export function settingSelectControlLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
