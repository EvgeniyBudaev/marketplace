import { Home, homeLinks } from "~/pages/Home";

export default function Index() {
  return <Home />;
}

export function links() {
  return [...homeLinks()];
}
