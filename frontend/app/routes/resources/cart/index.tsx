import type { ActionFunctionArgs } from "@remix-run/node";
import { inputFromForm } from "remix-domains";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[resources cart formValues2] ", formValues);
  // const cart = JSON.parse(formValues.cart);
  // console.log("[action resources cart] ", cart);

  return null;
};

export default function ResourcesCartRoute() {
  return null;
}
