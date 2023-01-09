import { LoaderArgs } from "@remix-run/node";
import { shippingLinks } from "~/pages/Shipping";
import { YMap } from "~/pages/Shipping/YMap";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function ShippingRoute() {
  return <YMap />;
}

export function links() {
  return [...shippingLinks()];
}
