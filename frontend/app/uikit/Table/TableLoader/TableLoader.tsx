import type {FC} from "react";
import {Spinner} from "~/uikit";
import styles from "./TableLoader.css";

type TProps = {
    position?: number;
}

export const TableLoader: FC<TProps> = ({position}) => {
    const top = position ? `${position}px` : "";

    return (
        <div className="TableLoader" style={{top: top}}>
            <Spinner />
        </div>
    );
}

export function tableLoaderLinks() {
    return [{ rel: "stylesheet", href: styles }];
}
