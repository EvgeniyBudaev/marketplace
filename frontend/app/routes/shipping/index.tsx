import { shippingLinks } from "~/pages/Shipping";
import { YMap } from "~/pages/Shipping/YMap";

export default function ShippingPage() {
  return <YMap />;
}

export function links() {
  return [...shippingLinks()];
}
