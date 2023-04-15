import type { FC } from "react";
import { Logo, NavLink } from "~/components";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <footer className="Footer">
      <div className="Footer-Inner">
        <div className="Footer-LogoWrapper">
          <Logo className="Footer-Logo" />
        </div>
        <div className="Footer-Info">
          <NavLink href={"/about"} activeClassName="Footer-Text__isActive">
            <span className="Footer-Text">
              <Typography variant={ETypographyVariant.TextB3Regular}>О компании</Typography>
            </span>
          </NavLink>
          <NavLink href={"/delivery"} activeClassName="Footer-Text__isActive">
            <span className="FooterText">
              <Typography variant={ETypographyVariant.TextB3Regular}>Доставка и оплата</Typography>
            </span>
          </NavLink>
          <NavLink href={"/contacts"} activeClassName="Footer-Text__isActive">
            <span className="Footer-Text">
              <Typography variant={ETypographyVariant.TextB3Regular}>Контакты</Typography>
            </span>
          </NavLink>
        </div>
        <div className="Footer-Copy">
          <div className="Footer-Text">
            <Typography variant={ETypographyVariant.TextB3Regular}>Web design by</Typography>
            <a href={"https://github.com/EvgeniyBudaev"}>
              <span className="Footer-Link">
                &nbsp;
                <Typography variant={ETypographyVariant.TextB3Regular}>Evgeniy Budaev</Typography>
              </span>
            </a>
          </div>
          <div className="Footer-Text">
            <Typography variant={ETypographyVariant.TextB3Regular}>Developed by</Typography>
            <a href={"https://github.com/EvgeniyBudaev"}>
              <span className="Footer-Link">
                &nbsp;
                <Typography variant={ETypographyVariant.TextB3Regular}>Evgeniy Budaev</Typography>
              </span>
            </a>
          </div>
          <div className="Footer-Text">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              Marketplace ©&nbsp;2023
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export function footerLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
