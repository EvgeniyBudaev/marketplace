import { FC } from "react";
import {CATALOG_ALIAS, TRANSITION} from "src/constants";
import { Overlay } from "src/uikit";
import { AsideMirrors } from "./AsideMirrors";
import classes from "./Aside.module.scss";

type TProps = {
  catalogAlias: string;
};

export const Aside: FC<TProps> = ({ catalogAlias }) => {
  const renderContent = () => {
    switch (catalogAlias) {
      case CATALOG_ALIAS.MIRRORS:
        return <AsideMirrors />;
      default:
        return <div>Not</div>;
    }
  };

  return (
    <aside className={classes.Aside}>
      <Overlay timeout={TRANSITION} onClick={() => {}} isActive={false} />
      {renderContent()}
    </aside>
  );
};
