import React from "react";
import ArrowBack from "../assets/icons/ArrowBack.svg";
import ArrowDown from "../assets/icons/ArrowDown.svg";
import ArrowLeft from "../assets/icons/ArrowLeft.svg";
import ArrowRight from "../assets/icons/ArrowRight.svg";
import Attention from "../assets/icons/Attention.svg";
import Card from "../assets/icons/Card.svg";
import Cart from "../assets/icons/Cart.svg";
import Cash from "../assets/icons/Cash.svg";
import Checkbox from "../assets/icons/Checkbox.svg";
import Close from "../assets/icons/Close.svg";
import Console from "../assets/icons/Console.svg";
import Defence from "../assets/icons/Defence.svg";
import DisplayGrid from "../assets/icons/DisplayGrid.svg";
import DisplayLine from "../assets/icons/DisplayLine.svg";
import Enter from "../assets/icons/Enter.svg";
import Exit from "../assets/icons/Exit.svg";
import Factory from "../assets/icons/Factory.svg";
import Filter from "../assets/icons/Filter.svg";
import Home from "../assets/icons/Home.svg";
import House from "../assets/icons/House.svg";
import LogoShort from "../assets/icons/LogoShort.svg";
import Mirror from "../assets/icons/Mirror.svg";
import Search from "../assets/icons/Search.svg";
import Shipping from "../assets/icons/Shipping.svg";
import Spinner from "../assets/icons/Spinner.svg";
import Star from "../assets/icons/Star.svg";
import Trash from "../assets/icons/Trash.svg";
import User from "../assets/icons/User.svg";
import UserAvatar from "../assets/icons/UserAvatar.svg";
import Visa from "../assets/icons/Visa.svg";
import Visibility from "../assets/icons/Visibility.svg";
import VisibilityOff from "../assets/icons/VisibilityOff.svg";

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
  | "Defence"
  | "DisplayGrid"
  | "DisplayLine"
  | "Enter"
  | "Exit"
  | "Factory"
  | "Filter"
  | "Home"
  | "House"
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
  ["ArrowBack", <ArrowBack key={"ArrowBack"} />],
  ["ArrowDown", <ArrowDown key={"ArrowDown"} />],
  ["ArrowLeft", <ArrowLeft key={"ArrowLeft"} />],
  ["ArrowRight", <ArrowRight key={"ArrowRight"} />],
  ["Attention", <Attention key={"Attention"} />],
  ["Card", <Card key={"Card"} />],
  ["Cart", <Cart key={"Cart"} />],
  ["Cash", <Cash key={"Cash"} />],
  ["Checkbox", <Checkbox key={"Checkbox"} />],
  ["Close", <Close key={"Close"} />],
  ["Console", <Console key={"Console"} />],
  ["Defence", <Defence key={"Defence"} />],
  ["DisplayGrid", <DisplayGrid key={"DisplayGrid"} />],
  ["DisplayLine", <DisplayLine key={"DisplayLine"} />],
  ["Enter", <Enter key={"Enter"} />],
  ["Exit", <Exit key={"Exit"} />],
  ["Factory", <Factory key={"Factory"} />],
  ["Filter", <Filter key={"Filter"} />],
  ["Home", <Home key={"Home"} />],
  ["House", <House key={"House"} />],
  ["LogoShort", <LogoShort key={"LogoShort"} />],
  ["Mirror", <Mirror key={"Mirror"} />],
  ["Search", <Search key={"Search"} />],
  ["Shipping", <Shipping key={"Shipping"} />],
  ["Spinner", <Spinner key={"Spinner"} />],
  ["Star", <Star key={"Star"} />],
  ["Trash", <Trash key={"Trash"} />],
  ["User", <User key={"User"} />],
  ["UserAvatar", <UserAvatar key={"UserAvatar"} />],
  ["Visa", <Visa key={"Visa"} />],
  ["Visibility", <Visibility key={"Visibility"} />],
  ["VisibilityOff", <VisibilityOff key={"VisibilityOff"} />],
]);
