import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { catalogsLinks } from "#app/pages/Admin/Catalogs";
import { ETypographyVariant, LinkButton, Typography } from "#app/uikit";
import styles from "./Admin.css";

export const Admin: FC = () => {
  const { t } = useTranslation();

  return (
    <section>
      <h1 className="Admin-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.title")}
        </Typography>
      </h1>
      <div>
        <LinkButton href="/admin/catalogs">
          {t("pages.admin.link.catalogs")}
        </LinkButton>
      </div>
      <div>
        <LinkButton href="/admin/products">
          {t("pages.admin.link.products")}
        </LinkButton>
      </div>
      <div>
        <LinkButton href="/admin/attributes">
          {t("pages.admin.link.attributes")}
        </LinkButton>
      </div>
      <div>
        <LinkButton href="/admin/orders">
          {t("pages.admin.link.orders")}
        </LinkButton>
      </div>
    </section>
  );
};

export function adminLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogsLinks()];
}
