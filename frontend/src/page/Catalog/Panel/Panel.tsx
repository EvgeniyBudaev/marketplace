import { FC } from "react";
import clsx from "clsx";
import classes from "./Panel.module.scss";
import {IconButton} from "src/uikit";

type TProps = {
    isClickedDisplayLine?: boolean;
    onDisplayLine: () => void;
};

export const Panel: FC<TProps> = ({isClickedDisplayLine, onDisplayLine}) => {
    return (
        <div className={classes.Panel}>
            <div className={classes.Inner}>
                <div className={classes.SelectGroup}>Select</div>
                <div className={classes.ListingViewSwitcher}>
                    <div className={classes.ListingViewSwitcherInner}>
                        <div
                            className={clsx(classes.ListingViewSwitcherPointer, {
                                [classes.ListingViewSwitcherPointer__line]: isClickedDisplayLine,
                            })}
                        />
                        <div className={classes.DisplayButtons}>
                            <IconButton
                                className={clsx(classes.DisplayButton, {
                                    [classes.DisplayButton__line]: isClickedDisplayLine,
                                })}
                                typeIcon="DisplayLine"
                                onClick={onDisplayLine}
                            />
                            <IconButton
                                className={clsx(classes.DisplayButton, {
                                    [classes.DisplayButton__line]: !isClickedDisplayLine,
                                })}
                                typeIcon="DisplayGrid"
                                onClick={onDisplayLine}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};