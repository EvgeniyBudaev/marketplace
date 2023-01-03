import { About, aboutLinks } from "~/pages/About";
import ShippingRoute from "~/routes/shipping";

export default function AboutRoute() {
  return <About />;
}

export function links() {
  return [...aboutLinks()];
}
