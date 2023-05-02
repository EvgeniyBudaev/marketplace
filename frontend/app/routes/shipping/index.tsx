import {json} from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { shippingLinks } from "~/pages/Shipping";
import { YMap } from "~/pages/Shipping/YMap";
import {getStoreFixedT} from "~/shared/store";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({request})]);
  return json({
    title: t("pages.shipping.meta.title"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.title || "Shipping" };
};

export default function ShippingRoute() {
  return <YMap />;
}

export function links() {
  return [...shippingLinks()];
}
