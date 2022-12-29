import { About, aboutLinks } from "~/pages/About";

export default function AboutPage() {
  return <About />;
}

export function links() {
  return [...aboutLinks()];
}
