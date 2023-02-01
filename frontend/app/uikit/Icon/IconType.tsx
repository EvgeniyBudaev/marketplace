import React from "react";

import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  AttentionIcon,
  CardIcon,
  CartIcon,
  CashIcon,
  CheckboxIcon,
  CloseIcon,
  ConsoleIcon,
  DarkModeIcon,
  DefenceIcon,
  DisplayGridIcon,
  DisplayLineIcon,
  EnterIcon,
  ExitIcon,
  FactoryIcon,
  FilterIcon,
  HomeIcon,
  HouseIcon,
  LightModeIcon,
  LogoIcon,
  LogoShortIcon,
  MirrorIcon,
  SearchIcon,
  ShippingIcon,
  SpinnerIcon,
  StarIcon,
  TrashIcon,
  UserIcon,
  UserAvatarIcon,
  VisaIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "~/uikit/assets/icons";

export type IconType =
  | "ArrowBack"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Attention"
  | "Card"
  | "Cart"
  | "Cash"
  | "Checkbox"
  | "Close"
  | "Console"
  | "DarkMode"
  | "Defence"
  | "DisplayGrid"
  | "DisplayLine"
  | "Enter"
  | "Exit"
  | "Factory"
  | "Filter"
  | "Home"
  | "House"
  | "LightMode"
  | "Logo"
  | "LogoShort"
  | "Mirror"
  | "Search"
  | "Shipping"
  | "Spinner"
  | "Star"
  | "Trash"
  | "User"
  | "UserAvatar"
  | "Visa"
  | "Visibility"
  | "VisibilityOff";

export const iconTypes = new Map([
  ["ArrowBack", <ArrowBackIcon key={"ArrowBack"} />],
  ["ArrowDown", <ArrowDownIcon key={"ArrowDown"} />],
  ["ArrowLeft", <ArrowLeftIcon key={"ArrowLeft"} />],
  ["ArrowRight", <ArrowRightIcon key={"ArrowRight"} />],
  ["Attention", <AttentionIcon key={"Attention"} />],
  ["Card", <CardIcon key={"Card"} />],
  ["Cart", <CartIcon key={"Cart"} />],
  ["Cash", <CashIcon key={"Cash"} />],
  ["Checkbox", <CheckboxIcon key={"Checkbox"} />],
  ["Close", <CloseIcon key={"Close"} />],
  ["Console", <ConsoleIcon key={"Console"} />],
  ["DarkMode", <DarkModeIcon key={"DarkMode"} />],
  ["Defence", <DefenceIcon key={"Defence"} />],
  ["DisplayGrid", <DisplayGridIcon key={"DisplayGrid"} />],
  ["DisplayLine", <DisplayLineIcon key={"DisplayLine"} />],
  ["Enter", <EnterIcon key={"Enter"} />],
  ["Exit", <ExitIcon key={"Exit"} />],
  ["Factory", <FactoryIcon key={"Factory"} />],
  ["Filter", <FilterIcon key={"Filter"} />],
  ["Home", <HomeIcon key={"Home"} />],
  ["HouseIcon", <HouseIcon key={"Home"} />],
  ["LightMode", <LightModeIcon key={"LightMode"} />],
  ["Logo", <LogoIcon key={"Logo"} />],
  ["LogoShort", <LogoShortIcon key={"LogoShort"} />],
  ["Mirror", <MirrorIcon key={"Mirror"} />],
  ["Search", <SearchIcon key={"Search"} />],
  ["Shipping", <ShippingIcon key={"Shipping"} />],
  ["Spinner", <SpinnerIcon key={"Spinner"} />],
  ["Star", <StarIcon key={"Star"} />],
  ["Trash", <TrashIcon key={"Trash"} />],
  ["User", <UserIcon key={"User"} />],
  ["UserAvatar", <UserAvatarIcon key={"UserAvatar"} />],
  ["Visa", <VisaIcon key={"Visa"} />],
  ["Visibility", <VisibilityIcon key={"Visibility"} />],
  ["VisibilityOff", <VisibilityOffIcon key={"VisibilityOff"} />],
]);
