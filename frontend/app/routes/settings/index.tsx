import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Settings, settingsLinks } from "~/pages";
import { getStoreFixedT } from "~/shared/store";
import i18next from "i18next";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT(request)]);

  return json({
    title: t("pages.settings.meta.title"),
  });
};
let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("pages.settings.meta.title") || "Settings" };
  }
  hydration++;
  return { title: data?.title || "Settings" };
};

export default function SettingsRoute() {
  return <Settings />;
}

export function links() {
  return [...settingsLinks()];
}
