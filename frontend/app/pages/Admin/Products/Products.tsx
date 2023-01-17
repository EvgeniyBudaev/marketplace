import type { FC } from "react";
import { productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { TProducts } from "~/shared/api/products";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Products.module.css";

type TProps = {
  products: TProducts;
};

export const Products: FC<TProps> = ({ products }) => {
  return (
    <section>
      <h1 className="Products-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Продукты</Typography>
      </h1>
      <div>
        <LinkButton href="/admin/products/add">Добавить</LinkButton>
      </div>
      <ul>
        {products.content.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
};

export function productsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...productAddLinks()];
}
