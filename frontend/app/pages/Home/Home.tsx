import { FC } from "react";
import styles from "./Home.module.css";


export const Home: FC = () => {
  return (
    <div className="Home">
      {/*<LinkButton href="/catalog/mirrors">Каталог зеркал</LinkButton>*/}
        Hello World
    </div>
  );
};

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}
