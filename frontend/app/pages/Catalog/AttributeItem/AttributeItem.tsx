import type { FC } from "react";
import styles from "./AttributeItem.css";

type TAttribute = {
  attributeName: string;
  value: string | number;
};

type TProps = {
  attribute: TAttribute;
};

export const AttributeItem: FC<TProps> = ({ attribute }) => {
  const { attributeName, value } = attribute;
  return (
    <li className="AttributeItem-RowLine">
      <div className="AttributeItem-LabelLine">{attributeName}:</div>
      <div className="AttributeItem-ValueLine">{value}</div>
    </li>
  );
};

export function attributeItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
