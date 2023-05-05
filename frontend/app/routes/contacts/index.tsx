import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { Contacts, contactsLinks } from "~/pages/Contacts";
import { getStoreFixedT } from "~/shared/store";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({request})]);
  return json({
    title: t("routes.titles.contacts"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  return { title: i18next.t("routes.titles.contacts") || "Contacts" };
};

export default function ContactsRoute() {
  return <Contacts />;
}

export function links() {
  return [...contactsLinks()];
}
