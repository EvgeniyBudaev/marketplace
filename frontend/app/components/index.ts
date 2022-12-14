export * from "./Error";
export * from "./ErrorBoundary";
export * from "./Logo";
export * from "./Layout";
export * from "./NavLink";
export * from "./Search";

import { logoLinks } from "~/components/Logo";
import { layoutLinks } from "~/components/Layout";
import { footerLinks } from "~/components/Layout/Footer";
import { headerLinks } from "~/components/Layout/Header";
import { searchLinks } from "~/components/Search";

export const links = () => {
  return [...logoLinks(), ...layoutLinks(), ...footerLinks(), ...headerLinks(), ...searchLinks()];
};
