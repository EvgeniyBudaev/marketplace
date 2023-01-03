import { shippingLinks } from "~/pages/Shipping";
import { YMap } from "~/pages/Shipping/YMap";

export default function ShippingRoute() {
  return <YMap />;
}

export function links() {
  return [...shippingLinks()];
}
