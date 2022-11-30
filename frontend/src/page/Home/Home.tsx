import { FC } from "react";
import { LinkButton } from "src/uikit";
import classes from "./Home.module.scss";

export const Home: FC = () => {
  return (
    <div className={classes.Home}>
      <LinkButton href="/catalog/mirrors">Каталог зеркал</LinkButton>
    </div>
  );
};
