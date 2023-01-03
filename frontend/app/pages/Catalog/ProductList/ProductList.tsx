import { useEffect, useRef } from "react";
import type { FC } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import type { TProduct } from "~/shared/api/products";
import { ProductListItem } from "../ProductListItem";
import styles from "./ProductList.module.css";
import { useCart } from "~/hooks";

type TProps = {
  pages: TProduct[][];
  isCardsLine: boolean;
  onPageChange?: (page: number) => void;
  scrollIntoPage?: number;
};

const getRandomString = () => Math.random().toString(36).substring(7);

export const ProductList: FC<TProps> = ({ pages, isCardsLine, onPageChange, scrollIntoPage }) => {
  const { cart, onChangeCartItem } = useCart();
  const listItems = useRef<(HTMLLIElement | null)[][]>([]);
  const page = useRef<number | null>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visiblePage = Number((entry.target as HTMLLIElement).dataset.page);

            if (visiblePage !== page.current) {
              page.current = visiblePage;
              onPageChange?.(visiblePage);
            }
          }
        });
      },
      {
        root: null,
        threshold: 1,
      },
    );

    listItems.current.forEach((page, i) => {
      page.forEach((el) => {
        if (el) {
          intersectionObserver.observe(el);
          el.dataset.page = (i + 1).toString();
        }
      });
    });

    return () => intersectionObserver.disconnect();
  });

  useEffect(() => {
    if (scrollIntoPage) {
      const page = listItems.current[scrollIntoPage - 1];
      const firstProduct = page[0];

      if (firstProduct) {
        firstProduct.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [scrollIntoPage]);

  return (
    <ul
      className={clsx("ProductList", {
        ProductList__line: isCardsLine,
      })}
    >
      {!isNil(pages) &&
        // TODO random keys are bad. Very bad.
        pages.flatMap((page, i) =>
          page === undefined
            ? []
            : page.map((product, j) => (
                <ProductListItem
                  key={getRandomString() + product.id}
                  cart={cart}
                  product={product}
                  ref={(el) => ((listItems.current[i] || (listItems.current[i] = []))[j] = el)}
                  isCardsLine={isCardsLine}
                  onChangeCartItem={onChangeCartItem}
                />
              )),
        )}
    </ul>
  );
};

export function productListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
