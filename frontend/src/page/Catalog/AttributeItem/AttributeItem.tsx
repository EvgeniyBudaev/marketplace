import type { FC } from "react";
import classes from "./AttributeItem.module.scss";

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
    <li className={classes.RowLine}>
      <div className={classes.LabelLine}>{attributeName}:</div>
      <div className={classes.ValueLine}>{value}</div>
    </li>
  );
};
