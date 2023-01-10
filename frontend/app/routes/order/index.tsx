import { LoaderArgs } from "@remix-run/node";
import { Order, orderLinks } from "~/pages";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function OrderRoute() {
  return <Order />;
}

export function links() {
  return [...orderLinks()];
}
