import i18next from "i18next";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { inputFromSearch } from "remix-domains";
import { EPermissions, ERoutes } from "~/enums";
import { Orders, ordersLinks } from "~/pages";
import { getOrderList } from "~/shared/api/orders";
import type { TOrderList } from "~/shared/api/orders";
import { mapOrderListToDto } from "~/shared/api/orders/utils";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { checkRequestPermission, createPath, internalError } from "~/utils";

type TLoaderData = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  orders: TOrderList;
  success?: boolean;
  title?: string;
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(createPath({ route: ERoutes.Login }));
  }

  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapOrderListToDto({
    ...formValues,
  });
  console.log("[formattedParams] ", formattedParams);
  const response = await getOrderList(request, formattedParams);

  if (!response.success) {
    throw internalError();
  }

  return json({
    orders: response.data,
    title: t("routes.titles.orders"),
  });
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.orders") || "Orders" }];
  }
  return [{ title: data?.title || "Orders" }];
};

export default function OrdersIndexRoute() {
  const data = useLoaderData<TLoaderData>();

  return <Orders orders={data.orders} />;
}

export function links() {
  return [...ordersLinks()];
}
