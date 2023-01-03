import { Recipient, recipientLinks } from "~/pages";

export default function RecipientRoute() {
  return <Recipient />;
}

export function links() {
  return [...recipientLinks()];
}
