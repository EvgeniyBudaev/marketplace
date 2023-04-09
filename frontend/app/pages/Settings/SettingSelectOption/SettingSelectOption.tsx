import { components } from "react-select";
import styles from "./SettingSelectOption.css";

export const SettingSelectOption = (props: any) => (
  <components.Option {...props}>
    <div className="SettingSelectOption">
      {props.data.prefixIcon}
      <span className="SettingSelectOption-Children">{props.children}</span>
    </div>
  </components.Option>
);

export function settingSelectOptionLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
