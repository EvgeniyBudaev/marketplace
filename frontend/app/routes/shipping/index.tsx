import { Shipping, shippingLinks } from "~/pages/Shipping";

export default function ShippingPage() {
  return <Shipping />;
}

export function links() {
  return [...shippingLinks()];
}
