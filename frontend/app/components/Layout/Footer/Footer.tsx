import type { FC } from "react";
import { Link } from "@remix-run/react";
import { Logo } from "~/components";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <footer className="Footer">
      <div className="Footer-Inner">
        <div className="Footer-LogoWrapper">
          <Logo className="Footer-Logo" />
        </div>
        <div className="Footer-Copy">
          <div className="Footer-Text">
            <Typography variant={ETypographyVariant.TextB3Regular}>Web design by</Typography>
            <Link to={"https://github.com/EvgeniyBudaev"}>
              <span className="Footer-Link">
                &nbsp;
                <Typography variant={ETypographyVariant.TextB3Regular}>Evgeniy Budaev</Typography>
              </span>
            </Link>
          </div>
          <div className="Footer-Text">
            <Typography variant={ETypographyVariant.TextB3Regular}>Developed by</Typography>
            <Link to={"https://github.com/EvgeniyBudaev"}>
              <span className="Footer-Link">
                &nbsp;
                <Typography variant={ETypographyVariant.TextB3Regular}>Evgeniy Budaev</Typography>
              </span>
            </Link>
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
