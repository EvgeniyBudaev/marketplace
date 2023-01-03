import { Contacts, contactsLinks } from "~/pages/Contacts";
import ShippingRoute from "~/routes/shipping";

export default function ContactsRoute() {
  return <Contacts />;
}

export function links() {
  return [...contactsLinks()];
}
