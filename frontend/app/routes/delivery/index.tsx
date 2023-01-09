import { LoaderArgs } from "@remix-run/node";
import { Delivery, deliveryLinks } from "~/pages/Delivery";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function DeliveryRoute() {
  return <Delivery />;
}

export function links() {
  return [...deliveryLinks()];
}
