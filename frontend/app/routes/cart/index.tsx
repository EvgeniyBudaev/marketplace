import { json, LoaderArgs } from "@remix-run/node";
import { Cart, cartLinks } from "~/pages/Cart";
import { getCart } from "~/shared/api/cart";
import { internalError } from "~/utils";
import { useLoaderData } from "@remix-run/react";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const params = { uuid: "054c3bdf-610e-4c2f-ba84-f80173ef5a17" };

  const cart = await getCart(request, params);

  if (!cart.success) {
    throw internalError();
  }

  return json({
    cart: cart.data,
  });
};

export default function CartRoute() {
  const { cart } = useLoaderData<typeof loader>();
  console.log("page cart: ", cart);
  return <Cart cart={cart} />;
}

export function links() {
  return [...cartLinks()];
}
