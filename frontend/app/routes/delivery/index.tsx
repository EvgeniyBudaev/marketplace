import { Delivery, deliveryLinks } from "~/pages/Delivery";
import ShippingRoute from "~/routes/shipping";

export default function DeliveryRoute() {
  return <Delivery />;
}

export function links() {
  return [...deliveryLinks()];
}
