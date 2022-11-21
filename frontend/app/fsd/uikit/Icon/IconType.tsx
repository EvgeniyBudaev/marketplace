import React from "react";
import { newGuid } from "../../utils";
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
  ["ArrowBack", <ArrowBack key={newGuid()} />],
  ["ArrowDown", <ArrowDown key={newGuid()} />],
  ["ArrowLeft", <ArrowLeft key={newGuid()} />],
  ["ArrowRight", <ArrowRight key={newGuid()} />],
  ["Attention", <Attention key={newGuid()} />],
  ["Card", <Card key={newGuid()} />],
  ["Cart", <Cart key={newGuid()} />],
  ["Cash", <Cash key={newGuid()} />],
  ["Checkbox", <Checkbox key={newGuid()} />],
  ["Close", <Close key={newGuid()} />],
  ["Console", <Console key={newGuid()} />],
  ["Defence", <Defence key={newGuid()} />],
  ["DisplayGrid", <DisplayGrid key={newGuid()} />],
  ["DisplayLine", <DisplayLine key={newGuid()} />],
  ["Enter", <Enter key={newGuid()} />],
  ["Exit", <Exit key={newGuid()} />],
  ["Factory", <Factory key={newGuid()} />],
  ["Filter", <Filter key={newGuid()} />],
  ["Home", <Home key={newGuid()} />],
  ["House", <House key={newGuid()} />],
  ["LogoShort", <LogoShort key={newGuid()} />],
  ["Mirror", <Mirror key={newGuid()} />],
  ["Search", <Search key={newGuid()} />],
  ["Shipping", <Shipping key={newGuid()} />],
  ["Spinner", <Spinner key={newGuid()} />],
  ["Star", <Star key={newGuid()} />],
  ["Trash", <Trash key={newGuid()} />],
  ["User", <User key={newGuid()} />],
  ["UserAvatar", <UserAvatar key={newGuid()} />],
  ["Visa", <Visa key={newGuid()} />],
  ["Visibility", <Visibility key={newGuid()} />],
  ["VisibilityOff", <VisibilityOff key={newGuid()} />],
]);
