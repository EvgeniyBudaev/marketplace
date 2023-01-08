import { inputFromSearch } from "remix-domains";
import type { LoaderArgs } from "@remix-run/node";
import { Home, homeLinks } from "~/pages/Home";
// import { authenticate } from "~/shared/api/auth";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  console.log("[Home loader formValues] ", formValues);

  //const accessToken = await authenticate(request);
  //console.log("accessToken", accessToken);

  return null;
};

export default function Index() {
  return <Home />;
}

export function links() {
  return [...homeLinks()];
}
