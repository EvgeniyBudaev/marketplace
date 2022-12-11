import { Delivery, deliveryLinks } from "~/pages/Delivery";

export default function DeliveryPage() {
    return <Delivery />;
}

export function links() {
    return [...deliveryLinks()];
}
