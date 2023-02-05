import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { useSearchParams, useSubmit } from "@remix-run/react";
import { createBrowserHistory } from "history";
import { productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { ProductsTable } from "~/pages/Admin/Products/ProductsTable";
import { TProducts } from "~/shared/api/products";
import { TParams } from "~/types";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Products.module.css";

type TProps = {
  products: TProducts;
};

export const Products: FC<TProps> = ({ products }) => {
  const submit = useSubmit();
  const history = typeof document !== "undefined" ? createBrowserHistory() : null;
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<TParams>({});
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const getFormData = useCallback(() => {
    const formData = new FormData();

    // formData.append("sort", sorting);
    formData.append("page", page.toString());

    Object.entries(filter).forEach(([group, values]) => {
      values.forEach((value: string) => formData.append(group, value));
    });

    return formData;
  }, [page]);

  useEffect(() => {
    history?.push("?" + new URLSearchParams(getFormData() as any).toString());
    submit(getFormData());
  }, [page]);

  const handleChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      setPage(selected + 1);
    },
    [setPage],
  );

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
      <ProductsTable products={products} onChangePage={handleChangePage} />
    </section>
  );
};

export function productsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...productAddLinks()];
}
