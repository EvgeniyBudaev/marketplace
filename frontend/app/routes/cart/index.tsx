import { LoaderArgs } from "@remix-run/node";
import { Cart, cartLinks } from "~/pages/Cart";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function CartRoute() {
  return <Cart />;
}

export function links() {
  return [...cartLinks()];
}
