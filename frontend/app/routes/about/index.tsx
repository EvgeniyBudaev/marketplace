import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
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

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.about") || "About" };
  }
  hydration++;
  return { title: data?.title || "About" };
};

export default function AboutRoute() {
  return <About />;
}

export function links() {
  return [...aboutLinks()];
}
