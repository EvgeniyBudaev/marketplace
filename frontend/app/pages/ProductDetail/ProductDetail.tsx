import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useFetcher } from "@remix-run/react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

import { ERoutes } from "~/enums";
import type { TCart } from "~/shared/api/cart";
import type { TProductDetail } from "~/shared/api/products";
import { Button, ETypographyVariant, SliderSimple, SliderSyncing, Typography } from "~/uikit";
import { createPath, formatCurrency, formatListProxy, formatProxy } from "~/utils";
import styles from "./ProductDetail.module.css";

type TProps = {
  cart: TCart;
  product: TProductDetail;
};

export const ProductDetail: FC<TProps> = ({ cart, product }) => {
  const fetcher = useFetcher();
  const { t } = useTranslation();
  console.log("product: ", product);
  // console.log("cart: ", cart);

  const imageProduct = formatProxy(
    !isNil(product?.images)
      ? product.images[0]
      : "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png",
  );
  const sliderImages = formatListProxy(
    !isNil(product?.images)
      ? product.images
      : ["https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png"],
  );
  const isMobileScreen = false;

  const ROUTE_PRODUCT_DETAIL = createPath({
    route: ERoutes.ProductDetail,
    params: { alias: product.alias },
  });
  const count = Number(product.count);

  const imageResponsiveSizeWidth = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 400;
    }
  };

  const imageResponsiveSizeHeight = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 400;
    }
  };

  const handleAddToCart = () => {
    // fetcher.submit(
    //     { productAlias: product.alias, uuid: cart.uuid },
    //     {
    //       method: EFormMethods.Post,
    //       action: createPath({
    //         route: ERoutes.CatalogDetail,
    //         params: { alias: catalog.alias },
    //         withIndex: true,
    //       }),
    //     },
    // );
  };

  const renderButton = (product: TProductDetail) => {
    const isProductAtCart =
      cart && !isNil(cart.items) && cart.items.some((item) => item.product.id === product.id);

    return isProductAtCart ? (
      cart && !isNil(cart.items) && (
        <Link className="ProductDetail-ButtonGoAtCart" to={ROUTE_PRODUCT_DETAIL}>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("common.info.inCart")}
          </Typography>
        </Link>
      )
    ) : (
      <Button
        className="ProductDetail-ButtonAddToCart"
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
    <div className="ProductDetail">
      <h1 className="ProductDetail-Title">{product.name}</h1>
      <div className="ProductDetail-Navigation"></div>
      <div className="ProductDetail-Info">
        <div className="ProductDetail-ColMedia">
          <div className="ProductDetail-Gallery">
            {product?.images ? (
              <SliderSyncing
                alt={product.name}
                arrowsModal={true}
                focusOnSelect={true}
                images={sliderImages}
                swipeToSlide={true}
              />
            ) : (
              // <SliderSimple alt={product.name} arrows={true} dots={true} images={sliderImages} />
              <img
                className=""
                alt={product.name}
                src={imageProduct}
                width={imageResponsiveSizeWidth()}
                height={imageResponsiveSizeHeight()}
              />
            )}
          </div>
        </div>
        <div className="ProductDetail-ColSpecification">
          <div className="ProductDetail-Specification">
            <h2 className="ProductDetail-SpecificationTitle">
              {t("pages.productDetail.description")}
            </h2>
            <ul className="ProductDetail-SpecificationList">
              {!isEmpty(product.attributes) &&
                product.attributes.map((item) => (
                  <li key={item.attributeName}>
                    {item.attributeName}:&nbsp;{item.value}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="ProductDetail-ColPrice">
          <div className="ProductDetail-Price">{formatCurrency(parseInt(product.price))} ₽</div>
          <div>
            <div className="ProductDetail-ColPriceTitle">{t("pages.productDetail.goods")}:</div>
            &nbsp;
            <div className="ProductDetail-Status">
              {Number(product.count) > 0
                ? t("common.info.inStock")
                : t("common.info.itemOutOfStock")}
            </div>
          </div>
          <div className="ProductDetail-Pay">{t("pages.productDetail.paymentVariants")}</div>
          {count > 0 && <div className="ProductDetail-AddToCart">{renderButton(product)}</div>}
        </div>
      </div>
    </div>
  );
};

export function productDetailLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
