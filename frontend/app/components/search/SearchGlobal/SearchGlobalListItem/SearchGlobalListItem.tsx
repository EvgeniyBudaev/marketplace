import type { FC, MouseEvent } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { ERoutes } from "#app/enums";
import { useProxyUrl } from "#app/hooks";
import type { TProductByCatalog } from "#app/shared/api/products";
import { ETypographyVariant, Icon, Typography } from "#app/uikit";
import { createPath, formatCurrency } from "#app/utils";
import styles from "./SearchGlobalListItem.css";
import isNil from "lodash/isNil";

type TProps = {
  index: number;
  item: TProductByCatalog;
  isActive: boolean;
  onMouseOver: (event: MouseEvent<HTMLLIElement>, index: number) => void;
};

export const SearchGlobalListItem: FC<TProps> = ({
  index,
  item,
  isActive,
  onMouseOver,
}) => {
  const { proxyUrl } = useProxyUrl();

  const handleMouseOver = (event: MouseEvent<HTMLLIElement>) => {
    onMouseOver(event, index);
  };

  return (
    <>
      {"catalogAlias" in item && (
        <li className="SearchGlobalListItem" onMouseOver={handleMouseOver}>
          <Link
            to={createPath({
              route: ERoutes.ProductDetail,
              params: { alias: item.alias },
            })}
            className={clsx("SearchGlobalListItem-Link", {
              "SearchGlobalListItem-Link__active": isActive,
            })}
          >
            <div className="SearchGlobalListItem-Images">
              {!isNil(item?.defaultImage) ? (
                <img
                  className="SearchGlobalListItem-Image"
                  src={`${proxyUrl}${item.defaultImage}`}
                  alt=""
                  width="28"
                  height="28"
                />
              ) : (
                <Icon type="NoImage" />
              )}
            </div>
            <div className="SearchGlobalListItem-Title">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {item.name}
              </Typography>
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
