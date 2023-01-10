import { LoaderArgs } from "@remix-run/node";
import { Recipient, recipientLinks } from "~/pages";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function RecipientRoute() {
  return <Recipient />;
}

export function links() {
  return [...recipientLinks()];
}
