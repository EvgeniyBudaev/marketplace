import { Home, homeLinks } from "~/pages/Home";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { inputFromForm, inputFromSearch } from "remix-domains";
import { getSession } from "~/shared/api/auth";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[ACTION formValues] ", formValues);
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  console.log("[ACTION userId] ", userId);
  return null;
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  console.log("[LOADER formValues] ", formValues);
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const email = session.get("email");
  console.log("[LOADER userId] ", userId);
  console.log("[LOADER email] ", email);
  return null;
};

export default function Index() {
  return <Home />;
}

export function links() {
  return [...homeLinks()];
}
