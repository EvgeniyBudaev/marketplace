import {TSorting} from "~/types";

export const mapSortingToDto = (params?: TSorting) => {
    return {
        sort: params?.value ?? ""
    }
};