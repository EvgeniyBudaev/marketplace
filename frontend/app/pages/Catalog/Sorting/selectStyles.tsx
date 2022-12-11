import {GroupBase, StylesConfig} from "react-select";
import {ISelectOption} from "~/uikit";

export const selectStyles: StylesConfig<ISelectOption, false, GroupBase<ISelectOption>> | undefined = {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    control: (base) => ({
        ...base,
        border: "1px solid #B0976A",
        borderRadius: "0",
        // "&:hover": { borderColor: "#e5e5e5" },
        cursor: "pointer",
    }),
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    option: (
        base,
        { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }
    ) => ({
        ...base,
        backgroundColor: isSelected ? "#dfd3c3" : "",
        color: isFocused || isSelected ? "black" : "",
        borderRadius: "0",
        cursor: "pointer",
        ":active": {
            backgroundColor: "#dfd3c3",
        },
        ":hover": {
            backgroundColor: "#e4e4e4",
            transition: "all 0.15s",
        },
    }),
};
