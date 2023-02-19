import { errorLinks } from "~/components/Error";
import { layoutLinks } from "~/components/Layout";
import { footerLinks } from "~/components/Layout/Footer";
import { headerLinks } from "~/components/Layout/Header";
import { logoLinks } from "~/components/Logo";
import { modalDeleteLinks } from "~/components/modal";
import { searchGlobalLinks } from "~/components/search/SearchGlobal";
import { searchingPanelLinks } from "~/components/search/SearchingPanel";
import { tableHeaderLinks } from "~/components/table";
import { themeSwitcherLinks } from "~/components/ThemeSwitcher";

export * from "./Error";
export * from "./ErrorBoundary";
export * from "./Layout";
export * from "./Logo";
export * from "./NavLink";
export * from "./search/SearchGlobal";
export * from "./table";
export * from "./ThemeSwitcher";

export const links = () => {
  return [
    ...errorLinks(),
    ...headerLinks(),
    ...layoutLinks(),
    ...logoLinks(),
    ...modalDeleteLinks(),
    ...footerLinks(),
    ...searchGlobalLinks(),
    ...searchingPanelLinks(),
    ...tableHeaderLinks(),
    ...themeSwitcherLinks(),
  ];
};
