import {json} from "@remix-run/node";
import type { LoaderArgs , MetaFunction} from "@remix-run/node";
import { About, aboutLinks } from "~/pages/About";
import {getStoreFixedT} from "~/shared/store";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({request})]);

  return json({
    title: t("pages.about.meta.title"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.title || "About" };
};

export default function AboutRoute() {
  return <About />;
}

export function links() {
  return [...aboutLinks()];
}
