import { inputFromSearch } from "remix-domains";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { searchProducts } from "~/shared/api/search/domain.server";
import { parseResponseError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);

  try {
    const response = await searchProducts(request, { search: formValues.search.trim() });

    if (response.success) {
      return json(response.data);
    }

    return json(response);
  } catch (error) {
    return parseResponseError(error);
  }
};

export default function SearchRoute() {
  return null;
}
