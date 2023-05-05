import {json} from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { Delivery, deliveryLinks } from "~/pages/Delivery";
import {getStoreFixedT} from "~/shared/store";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({request})]);
  return json({
    title: t("routes.titles.delivery"),
  });
};

export const meta: MetaFunction = () => {
  return { title: i18next.t("routes.titles.delivery") || "Delivery" };
};

export default function DeliveryRoute() {
  return <Delivery />;
}

export function links() {
  return [...deliveryLinks()];
}
