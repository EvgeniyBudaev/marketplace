import { FC } from "react";
import { CATALOG_ALIAS, TRANSITION } from "src/constants";
import {TCatalog} from "src/entities/catalogs";
import { Overlay } from "src/uikit";
import { AsideMirrors } from "./AsideMirrors";
import classes from "./Aside.module.scss";

type TProps = {
  catalog?: TCatalog;
};

export const Aside: FC<TProps> = ({ catalog }) => {
  console.log("Aside catalog: ", catalog);

  const renderContent = (catalog: TCatalog) => {
    switch (catalog.alias) {
      case CATALOG_ALIAS.MIRRORS:
        return <AsideMirrors />;
      default:
        return null;
    }
  };

  if (!catalog) return null;

  return (
    <aside className={classes.Aside}>
      <Overlay timeout={TRANSITION} onClick={() => {}} isActive={false} />
      {/*{renderContent(catalog)}*/}
    </aside>
  );
};
