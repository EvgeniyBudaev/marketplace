import { json } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { About, aboutLinks } from "~/pages/About";
import { getStoreFixedT } from "~/shared/store";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);

  return json({
    title: t("routes.titles.about"),
  });
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.about") || "About" }];
  }

  return [{ title: data?.title || "About" }];
};

export default function AboutRoute() {
  return <About />;
}

export function links() {
  return [...aboutLinks()];
}
