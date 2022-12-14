import { Contacts, contactsLinks } from "~/pages/Contacts";

export default function ContactsPage() {
  return <Contacts />;
}

export function links() {
  return [...contactsLinks()];
}
