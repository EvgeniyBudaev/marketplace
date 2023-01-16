import type { FC } from "react";
import { catalogsLinks } from "~/pages/Admin/Catalogs";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Admin.module.css";

export const Admin: FC = () => {
  return (
    <section>
      <h1 className="Admin-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Админка</Typography>
      </h1>
      <div>
        <LinkButton href="/admin/catalogs">Каталоги</LinkButton>
      </div>
    </section>
  );
};

export function adminLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogsLinks()];
}
