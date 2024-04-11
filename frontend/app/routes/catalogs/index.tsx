import i18next from "i18next";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const loader = async (args: LoaderFunctionArgs) => {
  return null;
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.catalogs") || "Catalogs" }];
  }
  return [{ title: data?.title || "Catalogs" }];
};

export default function CatalogsIndexRoute() {
  return <h1>Catalogs</h1>;
}
