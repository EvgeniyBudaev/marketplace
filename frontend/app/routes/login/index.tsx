import { Login, loginLinks } from "~/pages/Auth/Login";

export default function LoginPage() {
  return <Login />;
}

export function links() {
  return [...loginLinks()];
}
