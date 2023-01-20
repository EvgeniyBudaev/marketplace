import type { FC } from "react";
import { productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { ProductsTable } from "~/pages/Admin/Products/ProductsTable";
import { TProducts } from "~/shared/api/products";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Products.module.css";

type TProps = {
  products: TProducts;
};

export const Products: FC<TProps> = ({ products }) => {
  return (
    <section>
      <div className="Products-Header">
        <div>
          <h1 className="Products-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>Продукты</Typography>
          </h1>
        </div>
        <div>
          <LinkButton href="/admin/products/add">Добавить</LinkButton>
        </div>
      </div>
      <ProductsTable products={products} />
    </section>
  );
};

export function productsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...productAddLinks()];
}
