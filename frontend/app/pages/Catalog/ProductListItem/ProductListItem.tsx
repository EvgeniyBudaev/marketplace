import {forwardRef} from "react";
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";
import type {FetcherWithComponents} from "@remix-run/react";
import {Link} from "@remix-run/react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import {ERoutes} from "~/enums";
import type {TCart} from "~/shared/api/cart";
import type {TCatalogDetail} from "~/shared/api/catalogs";
import type {TProductByCatalog} from "~/shared/api/products";
import {EFormMethods} from "~/shared/form";
import {Button, ETypographyVariant, Icon, Typography} from "~/uikit";
import {createPath, formatCurrency, formatProxy} from "~/utils";
import {AttributeItem} from "../AttributeItem";
import styles from "./ProductListItem.css";

type TProps = {
  cart: TCart;
  catalog: TCatalogDetail;
  product: TProductByCatalog;
  isCardsLine: boolean;
  fetcher: FetcherWithComponents<any>;
};

export const ProductListItem = forwardRef<HTMLLIElement, TProps>(function ProductListItem(
  {cart, catalog, product, isCardsLine, fetcher},
  ref,
) {
  const {t} = useTranslation();
  const ROUTE_PRODUCT_DETAIL = createPath({
    route: ERoutes.ProductDetail,
    params: {alias: product.alias},
  });
  const count = Number(product.count);
  const isMobileScreen = useMediaQuery({query: "(max-width: 500px)"});

  const imageResponsiveSizeWidth = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 200;
    }
  };

  const imageResponsiveSizeHeight = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 200;
    }
  };

  const handleAddToCart = () => {
    fetcher.submit(
      {productAlias: product.alias, uuid: cart.uuid},
      {
        method: EFormMethods.Post,
        action: createPath({
          route: ERoutes.CatalogDetail,
          params: {alias: catalog.alias},
          withIndex: true,
        }),
      },
    );
  };

  const renderButton = (product: TProductByCatalog) => {
    const isProductAtCart =
      cart && !isNil(cart.items) && cart.items.some((item) => item.product.id === product.id);

    return isProductAtCart ? (
      cart && !isNil(cart.items) && (
        <Link className="ProductListItem-ButtonGoAtCart" to={ERoutes.Cart}>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("common.info.inCart")}
          </Typography>
        </Link>
      )
    ) : (
      <Button
        className="ProductListItem-ButtonAddToCart"
        isDisabled={count <= 0}
        onClick={handleAddToCart}
      >
        <Typography variant={ETypographyVariant.TextB3Regular}>
          {t("common.actions.addToCart")}
        </Typography>
      </Button>
    );
  };

  return (
    <li
      className={clsx("ProductListItem", {
        ProductListItem__line: isCardsLine,
      })}
      ref={ref}
    >
      <div className="ProductListItem-Wrapper">
        <div className="ProductListItem-Content">
          <div
            className={clsx("ProductListItem-ContentContainerImage", {
              no_image: isNil(product?.defaultImage),
            })}
          >
            <Link className="ProductListItem-ContentLink" to={ROUTE_PRODUCT_DETAIL}>
              {!isNil(product?.defaultImage) ? (
                <img
                  className="ProductListItem-ContentImage"
                  alt={product.name}
                  src={formatProxy(product.defaultImage)}
                  width={imageResponsiveSizeWidth()}
                  height={imageResponsiveSizeHeight()}
                />
              ) : (
                <Icon type="NoImage"/>
              )}
            </Link>
          </div>
          <div className="ProductListItem-ContentDescription">
            <Link className="ProductListItem-ContentTitle" to={ROUTE_PRODUCT_DETAIL}>
              <Typography variant={ETypographyVariant.TextB3Regular}>{product.name}</Typography>
            </Link>
          </div>
          <ul className="ProductListItem-ContentDescriptionLine">
            <li className="ProductListItem-ContentDescriptionLinePrice">
              <Typography variant={ETypographyVariant.TextH6Bold}>
                {formatCurrency(parseInt(product.price))} ₽
              </Typography>
            </li>
            <li className="ProductListItem-ContentTitleLine">
              <Link to={ROUTE_PRODUCT_DETAIL}>
                <span className="ProductListItem-ContentTitle">
                  <Typography variant={ETypographyVariant.TextB3Regular}>{product.name}</Typography>
                </span>
              </Link>
            </li>
            {product.attributes.map((item) => (
              <AttributeItem key={item.attributeName} attribute={item}/>
            ))}
            <li className="ProductListItem-ContentDescriptionLineStatus">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {count > 0 ? t("common.info.inStock") : t("common.info.itemOutOfStock")}
              </Typography>
            </li>
          </ul>
        </div>
        <div className="ProductListItem-Footer">
          <div className="ProductListItem-FooterPrice">
            <Typography variant={ETypographyVariant.TextB2Bold}>
              {formatCurrency(parseInt(product.price))} ₽
            </Typography>
          </div>
          <div className="ProductListItem-FooterStatus">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {count > 0 ? t("common.info.inStock") : t("common.info.itemOutOfStock")}
            </Typography>
          </div>
          {count > 0 && (
            <div className="ProductListItem-FooterAddToCart">{renderButton(product)}</div>
          )}
        </div>
      </div>
    </li>
  );
});

export function productListItemLinks() {
  return [{rel: "stylesheet", href: styles}];
}
