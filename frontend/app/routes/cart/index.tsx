import { Cart, cartLinks } from "~/pages/Cart";

export default function CartPage() {
  return <Cart />;
}

export function links() {
  return [...cartLinks()];
}
