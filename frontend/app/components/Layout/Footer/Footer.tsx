import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "~/components";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./Footer.module.css";

export const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="Footer">
      <div className="Footer-Inner">
        <div className="Footer-Info">
          <NavLink href="/about" activeClassName="Footer-Text__isActive">
            <span className="Footer-Text">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("footer.about")}
              </Typography>
            </span>
          </NavLink>
          <NavLink href="/delivery" activeClassName="Footer-Text__isActive">
            <span className="Footer-Text">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("footer.shipping")}
              </Typography>
            </span>
          </NavLink>
          <NavLink href="/contacts" activeClassName="Footer-Text__isActive">
            <span className="Footer-Text">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("footer.contacts")}
              </Typography>
            </span>
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export function footerLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
