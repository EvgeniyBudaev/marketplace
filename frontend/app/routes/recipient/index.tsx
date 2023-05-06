import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { Recipient, recipientLinks } from "~/pages";
import { getStoreFixedT } from "~/shared/store";
import { getUserSession } from "~/shared/api/auth";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);

  // Get user
  const userSession = await getUserSession(request);
  const user = JSON.parse(userSession || "{}");
  console.log("[user] ", user);

  return json({
    title: t("routes.titles.recipient"),
    user,
  });
};

export const meta: MetaFunction = () => {
  return { title: i18next.t("routes.titles.recipient") || "Recipient" };
};

export default function RecipientRoute() {
  return <Recipient />;
}

export function links() {
  return [...recipientLinks()];
}
