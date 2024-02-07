import {json} from "@remix-run/node";
import type {ActionFunctionArgs} from "@remix-run/node";
import {getAttributesByCatalog} from "~/shared/api/attributes";
import {getResponseError} from "~/shared/domain";

export const action = async (args: ActionFunctionArgs) => {
  const {params, request} = args;
  const {alias} = params;

  try {
    const attributesByCatalogResponse = await getAttributesByCatalog(request, {alias});

    if (attributesByCatalogResponse.success) {
      return json({
        attributesByCatalog: attributesByCatalogResponse.data,
        success: true,
      });
    }

    return json({success: false});
  } catch (error) {
    const errorResponse = error as Response;
    const {message: formError, fieldErrors} = (await getResponseError(errorResponse)) ?? {};
    console.log("[ERROR] ", error);
    console.log("[fieldErrors] ", fieldErrors);
    console.log("[formError] ", formError);
    return json({success: false, formError, fieldErrors});
  }
};

export default function AttributesByCatalogRoute() {
  return null;
}
