import {DEFAULT_PAGE_SIZE} from "~/constants";
import {TParams} from "~/types";

export const mapParamsToDto = (params: TParams) => {
    return {
        ...params,
        pagesize: params?.pageSize ? Number(params.pageSize) : DEFAULT_PAGE_SIZE
    }
}