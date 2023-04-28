import type {FC} from "react";
import {Spinner} from "~/uikit";
import styles from "./TableLoader.css";

export const TableLoader: FC = () => {
    return (
        <div className="TableLoader">
            <Spinner />
        </div>
    );
}

export function tableLoaderLinks() {
    return [{ rel: "stylesheet", href: styles }];
}
