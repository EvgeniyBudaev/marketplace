import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
import { ROUTES } from "src/constants";
import { TProduct } from "src/types";
import { Button } from "src/uikit";
import { formatValueWithSpaces } from "src/utils";
import classes from "./ProductListItem.module.scss";

type TProps = {
  product: TProduct;
  isClickedDisplayLine: boolean;
};

export const ProductListItem: FC<TProps> = ({
  product,
  isClickedDisplayLine,
}) => {
  const count_in_stock = 10;
  const isMobileScreen = useMediaQuery({ query: "(max-width: 500px)" });

  const imageResponsiveSizeWidth = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 140;
    }
  };

  const imageResponsiveSizeHeight = () => {
    if (isMobileScreen) {
      return 100;
    } else {
      return 140;
    }
  };

  return (
    <li
      className={clsx(classes.ProductListItem, {
        [classes.ProductListItem__line]: isClickedDisplayLine,
      })}
    >
      <div className={classes.Wrapper}>
        <div className={classes.Content}>
          <div className={classes.ContentImg}>
            <Link href={`${ROUTES.MIRRORS}${product.alias}`}>
              <Image
                className={classes.ContentImage}
                alt={product.name}
                priority
                src={
                  "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png?itok=fovz__Gi"
                }
                width={imageResponsiveSizeWidth()}
                height={imageResponsiveSizeHeight()}
              />
            </Link>
          </div>
          <div className={classes.ContentDescription}>
            <Link
              className={classes.ContentTitle}
              href={`${ROUTES.MIRRORS}${product.alias}`}
            >
              {product.name}
            </Link>
          </div>
        </div>
        <div className={classes.Footer}>
          <div className={classes.FooterPrice}>
            {formatValueWithSpaces(parseInt("2500"))} ₽
          </div>
          <div className={classes.FooterStatus}>
            {count_in_stock > 0 ? "В наличии" : "Товар отсутствует"}
          </div>
          <div className={classes.FooterAddToCartGrid}>
            <Button
              className={classes.ButtonAddToCart}
              isDisabled={count_in_stock <= 0}
              onClick={() => {}}
            >
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
