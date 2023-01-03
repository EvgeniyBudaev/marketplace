import { Order, orderLinks } from "~/pages";

export default function OrderRoute() {
  return <Order />;
}

export function links() {
  return [...orderLinks()];
}
