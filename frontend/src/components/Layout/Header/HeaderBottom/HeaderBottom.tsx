import type {FC} from "react";
import clsx from "clsx";
import {NavLink} from "src/components";
import {Button, Hamburger, Spacer} from "src/uikit";
import classes from "./HeaderBottom.module.scss";

type TProps = {
    className?: string;
    isCatalogOpen?: boolean;
    isHomePage?: boolean;
    onCatalogToggle?: () => void;
};

export const HeaderBottom: FC<TProps> = ({className, isCatalogOpen, isHomePage, onCatalogToggle}) => {
    return (
        <div
            className={clsx(classes.HeaderBottom, className, {
                [classes.HeaderBottom__catalogOpen]: isCatalogOpen,
                [classes.HeaderBottom__isHomePage]: isHomePage,
            })}
        >
            <div className={classes.Container}>
                <div className={classes.Desktop}>
                    <div className={classes.Info}>
                        <div className={classes.InfoInner}>
                            <div className={classes.InfoLeft}>
                                <Button
                                    className={classes.ButtonCatalog}
                                    onClick={onCatalogToggle}
                                >
                                    <Hamburger
                                        className={classes.ButtonCatalogHamburger}
                                        color="white"
                                        isActive={isCatalogOpen}
                                    />
                                    <div className={classes.ButtonCatalogText}>Каталог</div>
                                </Button>
                            </div>
                            <Spacer />
                            {/*<Search*/}
                            {/*    className={classes.SearchControlsDesktop}*/}
                            {/*    transition={TRANSITION}*/}
                            {/*    isHomePage={isHomePage}*/}
                            {/*/>*/}
                            <Spacer />
                            <div className={classes.InfoRight}>
                                <NavLink
                                    href={"/about"}
                                    activeClassName={classes.Text__isActive}
                                >
                                    <span className={classes.Text}>О компании</span>
                                </NavLink>
                                <NavLink href={"/help"} activeClassName={classes.Text__isActive}>
                                    <span className={classes.Text}>Доставка и оплата</span>
                                </NavLink>
                                <NavLink
                                    href={"/contacts"}
                                    activeClassName={classes.Text__isActive}
                                >
                                    <span className={classes.Text}>Контакты</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Search*/}
                {/*    className={classes.SearchControlsMobile}*/}
                {/*    transition={TRANSITION}*/}
                {/*    isHomePage={isHomePage}*/}
                {/*/>*/}
            </div>
        </div>
    );
};