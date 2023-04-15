import React from "react";

import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowDropDownIcon,
  ArrowDropDownStrokeIcon,
  ArrowDropUpIcon,
  ArrowDropUpStrokeIcon,
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
  EditIcon,
  EnglishLanguageIcon,
  EnterIcon,
  ExitIcon,
  FactoryIcon,
  FilterIcon,
  HomeIcon,
  HouseIcon,
  ImageIcon,
  LightModeIcon,
  LogoIcon,
  LogoShortIcon,
  MirrorIcon,
  RussianLanguageIcon,
  SearchIcon,
  SettingsIcon,
  ShippingIcon,
  SortingIcon,
  SortDownIcon,
  SortUpIcon,
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
  | "ArrowDropDown"
  | "ArrowDropDownStroke"
  | "ArrowDropUp"
  | "ArrowDropUpStroke"
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
  | "Edit"
  | "EnglishLanguage"
  | "Enter"
  | "Exit"
  | "Factory"
  | "Filter"
  | "Home"
  | "House"
  | "Image"
  | "LightMode"
  | "Logo"
  | "LogoShort"
  | "Mirror"
  | "RussianLanguage"
  | "Search"
  | "Settings"
  | "Shipping"
  | "Sorting"
  | "SortDown"
  | "SortUp"
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
  ["ArrowDropDown", <ArrowDropDownIcon key={"ArrowDropDown"} />],
  ["ArrowDropDownStroke", <ArrowDropDownStrokeIcon key={"ArrowDropDownStroke"} />],
  ["ArrowDropUp", <ArrowDropUpIcon key={"ArrowDropUp"} />],
  ["ArrowDropUpStroke", <ArrowDropUpStrokeIcon key={"ArrowDropUpStroke"} />],
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
  ["Edit", <EditIcon key={"Edit"} />],
  ["EnglishLanguage", <EnglishLanguageIcon key={"EnglishLanguage"} />],
  ["Enter", <EnterIcon key={"Enter"} />],
  ["Exit", <ExitIcon key={"Exit"} />],
  ["Factory", <FactoryIcon key={"Factory"} />],
  ["Filter", <FilterIcon key={"Filter"} />],
  ["Home", <HomeIcon key={"Home"} />],
  ["House", <HouseIcon key={"Home"} />],
  ["Image", <ImageIcon key={"Image"} />],
  ["LightMode", <LightModeIcon key={"LightMode"} />],
  ["Logo", <LogoIcon key={"Logo"} />],
  ["LogoShort", <LogoShortIcon key={"LogoShort"} />],
  ["Mirror", <MirrorIcon key={"Mirror"} />],
  ["RussianLanguage", <RussianLanguageIcon key={"RussianLanguage"} />],
  ["Search", <SearchIcon key={"Search"} />],
  ["Settings", <SettingsIcon key={"Settings"} />],
  ["Shipping", <ShippingIcon key={"Shipping"} />],
  ["Sorting", <SortingIcon key={"Sorting"} />],
  ["SortDown", <SortDownIcon key={"SortDown"} />],
  ["SortUp", <SortUpIcon key={"SortUp"} />],
  ["Spinner", <SpinnerIcon key={"Spinner"} />],
  ["Star", <StarIcon key={"Star"} />],
  ["Trash", <TrashIcon key={"Trash"} />],
  ["User", <UserIcon key={"User"} />],
  ["UserAvatar", <UserAvatarIcon key={"UserAvatar"} />],
  ["Visa", <VisaIcon key={"Visa"} />],
  ["Visibility", <VisibilityIcon key={"Visibility"} />],
  ["VisibilityOff", <VisibilityOffIcon key={"VisibilityOff"} />],
]);
