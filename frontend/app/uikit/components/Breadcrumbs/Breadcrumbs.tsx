import { Link, useMatches } from "@remix-run/react";
import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { ERoutes } from "~/enums";
import { Icon } from "~/uikit";
import { Crumb, crumbsLinks } from "~/uikit/components/Breadcrumbs/Crumb";
import { BreadcrumbHandleSchema } from "~/uikit/components/Breadcrumbs/schemas";
import type { TBreadcrumbParams, TExtendedBreadcrumb } from "~/uikit/components/Breadcrumbs/types";
import { createPath } from "~/utils";
import styles from "./Breadcrumbs.css";

type TProps = {
  dataTestId?: string;
  params?: TBreadcrumbParams;
};

const BreadcrumbsComponent: FC<TProps> = ({ dataTestId = "uikit__breadcrumbs", params = {} }) => {
  const matches = useMatches();
  const { t } = useTranslation();

  const breadcrumbs = matches
    .map(({ handle, pathname }) => {
      const result = BreadcrumbHandleSchema.safeParse(handle);

      if (!result.success || !result.data.breadcrumb) {
        return null;
      }

      const breadcrumbTitle = result.data.breadcrumb.title;

      const title =
        typeof breadcrumbTitle === "function" ? breadcrumbTitle(t, params) : breadcrumbTitle;

      return {
        ...result.data.breadcrumb,
        title,
        to: pathname,
      };
    })
    .filter(Boolean) as TExtendedBreadcrumb[];
  console.log("breadcrumbs: ", breadcrumbs);

  return (
    <nav className="Breadcrumbs" data-testid={dataTestId}>
      <Link
        className="Crumb-Link"
        to={createPath({
          route: ERoutes.Root,
        })}
      >
        <Icon className="Crumb-Icon__home" type="Home" />
      </Link>
      {breadcrumbs.length > 0 && breadcrumbs[0].to !== ERoutes.Root && (
        <>
          <Icon className="Crumb-Icon__arrow" type="ArrowRight" />
          {breadcrumbs.map((breadcrumb, index) => {
            const isFirstCrumb = index === 0;
            const isLastCrumb = index === breadcrumbs.length - 1;
            const isShowArrow = index < breadcrumbs.length - 1;

            return (
              <Crumb
                key={`${breadcrumb.title}_${index}`}
                breadcrumb={breadcrumb}
                isFirstCrumb={isFirstCrumb}
                isLastCrumb={isLastCrumb}
                isShowArrow={isShowArrow}
              />
            );
          })}
        </>
      )}
    </nav>
  );
};

export const Breadcrumbs = memo(BreadcrumbsComponent);

export function breadcrumbsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...crumbsLinks()];
}
