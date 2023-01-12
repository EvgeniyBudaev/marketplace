import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { inputFromForm } from "remix-domains";
import { incrementCartItem } from "~/shared/api/cart";
import { parseResponseError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[resources cart formValues2] ", formValues);

  try {
    const response = await incrementCartItem(request, formValues);

    if (response.success) {
      console.log("[inc response.data] ", response.data);
      return json(response.data);
    }

    return json(response);
  } catch (error) {
    return parseResponseError(error);
  }
};

export default function ResourcesCartRoute() {
  return null;
}
