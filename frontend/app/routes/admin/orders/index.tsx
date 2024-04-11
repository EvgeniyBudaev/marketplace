import i18next from "i18next";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { inputFromSearch } from "remix-domains";
import { EPermissions, ERoutes } from "#app/enums";
import { Orders, ordersLinks } from "#app/pages";
import { getOrderList } from "#app/shared/api/orders";
import type { TOrderList } from "#app/shared/api/orders";
import { mapOrderListToDto } from "#app/shared/api/orders/utils";
import { getStoreFixedT } from "#app/shared/store";
import type { TDomainErrors } from "#app/types";
import { checkRequestPermission, createPath, internalError } from "#app/utils";

type TLoaderData = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  orders: TOrderList;
  success?: boolean;
  title?: string;
};

export const loader = async (args: LoaderFunctionArgs) => {
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

  const response = await getOrderList(request, formattedParams);

  if (!response.success) {
    throw internalError();
  }

  return json({
    orders: response.data,
    title: t("routes.titles.orders"),
  });
};

export const meta: MetaFunction = ({ data }) => {
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
