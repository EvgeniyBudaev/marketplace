import { json } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { Delivery, deliveryLinks } from "~/pages/Delivery";
import { getStoreFixedT } from "~/shared/store";
import type { TBaseRouteHandle } from "~/types/routes";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);
  return json({
    title: t("routes.titles.delivery"),
  });
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.delivery") || "Delivery" }];
  }
  return [{ title: data?.title || "Delivery" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.delivery"),
  },
};

export default function DeliveryRoute() {
  return <Delivery />;
}

export function links() {
  return [...deliveryLinks()];
}
