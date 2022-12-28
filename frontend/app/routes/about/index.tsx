import { About, aboutLinks } from "~/pages/About";
import { useChangeUser } from "~/hooks";

export default function AboutPage() {
  const { user } = useChangeUser();
  console.log("About user: ", user);
  return <About />;
}

export function links() {
  return [...aboutLinks()];
}
