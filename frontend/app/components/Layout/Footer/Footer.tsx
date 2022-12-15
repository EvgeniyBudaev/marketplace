import type { FC } from "react";
import { Link } from "@remix-run/react";
import { Logo } from "~/components";
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
            Web design by
            <Link to={"https://github.com/EvgeniyBudaev"}>
              <span className="Footer-Link">&nbsp;Evgeniy Budaev</span>
            </Link>
          </div>
          <div className="Footer-Text">
            Developed by
            <Link to={"https://github.com/EvgeniyBudaev"}>
              <span className="Footer-Link">&nbsp;Evgeniy Budaev</span>
            </Link>
          </div>
          <div className="Footer-Text">Marketplace ©&nbsp;2023</div>
        </div>
      </div>
    </footer>
  );
};

export function footerLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
