import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Contacts, contactsLinks } from "~/pages/Contacts";
import { getStoreFixedT } from "~/shared/store";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({request})]);
  return json({
    title: t("pages.contacts.meta.title"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.title || "Contacts" };
};

export default function ContactsRoute() {
  return <Contacts />;
}

export function links() {
  return [...contactsLinks()];
}
