import { Home, homeLinks } from "~/pages/Home";
import type { LoaderArgs } from "@remix-run/node";
import { inputFromSearch } from "remix-domains";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  console.log("[LOADER formValues] ", formValues);

  return null;
};

export default function Index() {
  return <Home />;
}

export function links() {
  return [...homeLinks()];
}
