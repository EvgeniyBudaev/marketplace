import { Cart, cartLinks } from "~/pages/Cart";
import ShippingRoute from "~/routes/shipping";

export default function CartRoute() {
  return <Cart />;
}

export function links() {
  return [...cartLinks()];
}
