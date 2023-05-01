import {json} from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Recipient, recipientLinks } from "~/pages";
import {getStoreFixedT} from "~/shared/store";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT(request)]);
  return json({
    title: t("pages.recipient.meta.title"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.title || "Recipient" };
};

export default function RecipientRoute() {
  return <Recipient />;
}

export function links() {
  return [...recipientLinks()];
}
