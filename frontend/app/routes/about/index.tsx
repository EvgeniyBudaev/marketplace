import { LoaderArgs } from "@remix-run/node";
import { About, aboutLinks } from "~/pages/About";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function AboutRoute() {
  return <About />;
}

export function links() {
  return [...aboutLinks()];
}
