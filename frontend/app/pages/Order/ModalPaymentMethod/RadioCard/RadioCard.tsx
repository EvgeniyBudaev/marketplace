import clsx from "clsx";
import type { FC } from "react";
import type { EPaymentMethod } from "~/pages/Order/enums";
import { Icon, Typography } from "~/uikit";
import type { IconType } from "~/uikit";
import { formatToCapitalize } from "~/uikit/utils";
import styles from "./RadioCard.css";

type TProps = {
  className?: string;
  isActive: boolean;
  name: EPaymentMethod;
  onChoice: (value: EPaymentMethod) => void;
  value: string;
};

export const RadioCard: FC<TProps> = ({ className, isActive, name, onChoice, value }) => {
  const nameCapitalize = formatToCapitalize(name) as IconType;

  const handleChoice = (value: EPaymentMethod) => {
    onChoice?.(value);
  };

  return (
    <div
      className={clsx("RadioCard", className, {
        RadioCard__active: isActive,
      })}
      onClick={() => handleChoice(name)}
    >
      <Icon className="RadioCard-Icon" type={nameCapitalize} />
      <Typography>{value}</Typography>
    </div>
  );
};

export function radioCardLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
