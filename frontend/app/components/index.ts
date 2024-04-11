import { errorLinks } from "#app/components/Error";
import {
  containerLinks,
  footerLinks,
  headerLinks,
  layoutLinks,
} from "#app/components/Layout";
import { logoLinks } from "#app/components/Logo";
import { modalDeleteLinks } from "#app/components/modal";
import { searchGlobalLinks } from "#app/components/search/SearchGlobal";
import { searchingPanelLinks } from "#app/components/search/SearchingPanel";
import { tableCellImageLinks, tableHeaderLinks } from "#app/components/table";
import { themeSwitcherLinks } from "#app/components/ThemeSwitcher";

export * from "./Error";
export * from "./ErrorBoundary";
export * from "./form";
export * from "./Layout";
export * from "./Logo";
export * from "./NavLink";
export * from "./search/SearchGlobal";
export * from "./table";
export * from "./ThemeSwitcher";

export const links = () => {
  return [
    ...containerLinks(),
    ...errorLinks(),
    ...headerLinks(),
    ...layoutLinks(),
    ...logoLinks(),
    ...modalDeleteLinks(),
    ...footerLinks(),
    ...searchGlobalLinks(),
    ...searchingPanelLinks(),
    ...tableCellImageLinks(),
    ...tableHeaderLinks(),
    ...themeSwitcherLinks(),
  ];
};
