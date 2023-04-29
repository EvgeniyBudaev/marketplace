import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Settings, settingsLinks } from "~/pages";
import { getStoreFixedT } from "~/shared/store/utils/getStoreFixedT";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT(request)]);

  return json({
    title: t("pages.settings.meta.title"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.title || "Settings" };
};

export default function SettingsRoute() {
  return <Settings />;
}

export function links() {
  return [...settingsLinks()];
}
