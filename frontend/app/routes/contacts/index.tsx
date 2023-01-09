import { LoaderArgs } from "@remix-run/node";
import { Contacts, contactsLinks } from "~/pages/Contacts";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function ContactsRoute() {
  return <Contacts />;
}

export function links() {
  return [...contactsLinks()];
}
