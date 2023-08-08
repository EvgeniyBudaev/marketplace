import clsx from "clsx";
import { memo } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { Icon } from "~/uikit";
import type { TExtendedBreadcrumb } from "~/uikit/components/Breadcrumbs/types";
import styles from "./Crumb.css";

type TProps = {
  breadcrumb: TExtendedBreadcrumb;
  className?: string;
  isFirstCrumb: boolean;
  isLastCrumb: boolean;
  isShowArrow: boolean;
};

const CrumbComponent: FC<TProps> = ({
  breadcrumb,
  className,
  isFirstCrumb,
  isLastCrumb,
  isShowArrow,
}) => {
  const renderTitle = () => {
    if (isLastCrumb) {
      return <span>{breadcrumb?.title ?? ""}</span>;
    } else {
      return (
        <Link className="Crumb-Link" to={breadcrumb.to}>
          {breadcrumb?.title ?? ""}
        </Link>
      );
    }
  };

  return (
    <span className={clsx("Crumb", className)}>
      {renderTitle()}
      {isShowArrow && <Icon className="Crumb-Icon__arrow" type="ArrowRight" />}
    </span>
  );
};

export const Crumb = memo(CrumbComponent);

export function crumbsLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
