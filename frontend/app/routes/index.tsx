import type { LoaderArgs } from "@remix-run/node";
import { Home, homeLinks } from "~/pages/Home";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function Index() {
  return <Home />;
}

export function links() {
  return [...homeLinks()];
}
