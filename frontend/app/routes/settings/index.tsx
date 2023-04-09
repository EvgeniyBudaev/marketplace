import type { LoaderArgs } from "@remix-run/node";
import { Settings, settingsLinks } from "~/pages";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function SettingsRoute() {
  return <Settings />;
}

export function links() {
  return [...settingsLinks()];
}
