import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { Settings, settingsLinks } from "~/pages";
import { getStoreFixedT } from "~/shared/store";
import type { TBaseRouteHandle } from "~/types/routes";

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);

  return json({
    title: t("pages.settings.meta.title"),
  });
};

export const meta: MetaFunction = ({ data }: any) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.settings") || "Settings" }];
  }
  return [{ title: data?.title || "Settings" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.settings"),
  },
};

export default function SettingsRoute() {
  return <Settings />;
}

export function links() {
  return [...settingsLinks()];
}
