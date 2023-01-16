import { LoaderArgs } from "@remix-run/node";
import { Admin, adminLinks } from "~/pages/Admin";

export const loader = async (args: LoaderArgs) => {
  return null;
};

export default function AdminRoute() {
  return <Admin />;
}

export function links() {
  return [...adminLinks()];
}
