import Link from "next/link";
import { FC } from "react";
import classes from "./Footer.module.scss";
import { Logo } from "src/components";

export const Footer: FC = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.FooterInner}>
        <div className={classes.FooterLogoWrapper}>
          <Logo className={classes.FooterLogo} />
        </div>
        <div className={classes.FooterCopy}>
          <div className={classes.FooterText}>
            Web design by
            <Link href={"https://github.com/EvgeniyBudaev"}>
              <span className={classes.FooterLink}>&nbsp;Evgeniy Budaev</span>
            </Link>
          </div>
          <div className={classes.FooterText}>
            Developed by
            <Link href={"https://github.com/EvgeniyBudaev"}>
              <span className={classes.FooterLink}>&nbsp;Evgeniy Budaev</span>
            </Link>
          </div>
          <div className={classes.FooterText}>Mirror Look ©&nbsp;2023</div>
        </div>
      </div>
    </footer>
  );
};
