import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { getCatalogs } from "~/shared/api/catalogs";
import { parseResponseError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;

  try {
    const response = await getCatalogs(request);

    if (response.success) {
      return json(response.data);
    }

    return json(response);
  } catch (error) {
    return parseResponseError(error);
  }
};
