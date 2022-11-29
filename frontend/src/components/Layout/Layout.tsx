import { usePathname } from "next/navigation";
import {FC, PropsWithChildren} from "react";
import clsx from "clsx";
import {ROUTES} from "src/constants";
import {Footer} from "./Footer";
import {Header} from "./Header";
import classes from "./Layout.module.scss";

type TProps = {
    className?: string;
    is404?: boolean;
} & PropsWithChildren;

export const Layout: FC<TProps> = ({className, children, is404}) => {
    const isScroll = false;
    const pathname = usePathname();

    return (
        <div className={clsx(classes.Layout, className)}>
            <div className={classes.Wrapper}>
                <div className={classes.Content}>
                    <Header />
                    <main
                        className={clsx(classes.Main, {
                            [classes.Main__isScroll]: isScroll,
                        })}
                    >
                        {pathname === ROUTES.HOME ? (
                            <div className={classes.ContainerHomePage}>{children}</div>
                        ) : (
                            <div
                                className={clsx(classes.Container, {
                                    [classes.Container__is404]: is404,
                                })}
                            >
                                {children}
                            </div>
                        )}
                    </main>
                </div>
                {pathname !== ROUTES.SHIPPING && !is404 && <Footer />}
            </div>
        </div>
    );
}