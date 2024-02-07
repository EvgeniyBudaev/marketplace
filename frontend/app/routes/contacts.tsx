import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { Contacts, contactsLinks } from "~/pages/Contacts";
import { getStoreFixedT } from "~/shared/store";
import type { TBaseRouteHandle } from "~/types/routes";

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);
  return json({
    title: t("routes.titles.contacts"),
  });
};

export const meta: MetaFunction = ({ data }: any) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.contacts") || "Contacts" }];
  }
  return [{ title: data?.title || "Contacts" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.contacts"),
  },
};

export default function ContactsRoute() {
  return <Contacts />;
}

export function links() {
  return [...contactsLinks()];
}
