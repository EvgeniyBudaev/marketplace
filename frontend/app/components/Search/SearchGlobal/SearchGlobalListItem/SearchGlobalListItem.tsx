import type { FC, MouseEvent } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { ERoutes } from "~/enums";
import type { TProductByCatalog } from "~/shared/api/products";
import { ETypographyVariant, Typography } from "~/uikit";
import { createPath, formatCurrency, formatProxy } from "~/utils";
import styles from "./SearchGlobalListItem.module.css";

type TProps = {
  index: number;
  item: TProductByCatalog;
  isActive: boolean;
  onMouseOver: (event: MouseEvent<HTMLLIElement>, index: number) => void;
};

export const SearchGlobalListItem: FC<TProps> = ({ index, item, isActive, onMouseOver }) => {
  const ROUTE_PRODUCT_DETAIL = createPath({
    route: ERoutes.ProductDetail,
    params: { alias: item.alias },
  });

  const handleMouseOver = (event: MouseEvent<HTMLLIElement>) => {
    onMouseOver(event, index);
  };

  return (
    <>
      {"catalogAlias" in item && (
        <li className="SearchGlobalListItem" onMouseOver={handleMouseOver}>
          <Link
            to={ROUTE_PRODUCT_DETAIL}
            className={clsx("SearchGlobalListItem-Link", {
              "SearchGlobalListItem-Link__active": isActive,
            })}
          >
            <div className="SearchListItem-Images">
              <img
                src={formatProxy(
                  "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png?itok=fovz__Gi",
                )}
                alt=""
                width="28"
                height="28"
              />
            </div>
            <div className="SearchGlobalListItem-Title">
              <Typography variant={ETypographyVariant.TextB3Regular}>{item.name}</Typography>
            </div>
            <div className="SearchGlobalListItem-Price">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {formatCurrency(parseInt(item.price))} ₽
              </Typography>
            </div>
          </Link>
        </li>
      )}
    </>
  );
};

export function searchGlobalListItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
