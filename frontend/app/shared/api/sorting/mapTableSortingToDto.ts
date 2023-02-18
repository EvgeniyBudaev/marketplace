import { TTableSortingParams } from "~/uikit";

export const mapTableSortingToDto = (params?: TTableSortingParams, type?: string) => {
  if (Array.isArray(params)) {
    return {
      sort: params
        ?.map((item) => `${item.sortProperty}_${item.sortDirection?.toLowerCase()}`)
        .join(","),
    };
  }
  return { sort: params ? `${params.sortProperty}_${params.sortDirection?.toLowerCase()}` : "" };
  // if (
  //     type &&
  //     (type === SORT_TYPE_PARTICIPANT_MENTION_TABLE ||
  //         type === SORT_TYPE_PARTICIPANT_ADDRESSES_TABLE ||
  //         type === SORT_TYPE_PARTICIPANT_TABLE)
  // ) {
  //     return { sort: params ? `${params.sortProperty},${params.sortDirection}` : '' };
  // }
  // return {
  //     sort: params?.sortProperty ?? '',
  //     sortDirection: params?.sortDirection ?? '',
  // };
};
