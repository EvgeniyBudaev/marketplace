import Link from "next/link";
import React, { ReactNode } from "react";
import clsx from "clsx";
import styles from "./LinkButton.module.scss";

export interface ILinkButtonProps {
    children?: ReactNode;
    className?: string;
    href: string;
}

export const LinkButton: React.FC<ILinkButtonProps> = ({
                                                           className,
                                                           children,
                                                           href,
                                                       }) => {
    return (
        <Link className={clsx(styles.LinkButton, className)} href={href}>
             <span>{children}</span>
        </Link>
    );
};