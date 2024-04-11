import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { About, aboutLinks } from "#app/pages/About";
import { getStoreFixedT } from "#app/shared/store";
import type { TBaseRouteHandle } from "#app/types/routes";

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);

  return json({
    title: t("routes.titles.about"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.about") || "About" }];
  }

  return [{ title: data?.title || "About" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.about"),
  },
};

export default function AboutRoute() {
  return <About />;
}

export function links() {
  return [...aboutLinks()];
}
