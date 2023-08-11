import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAuthenticityToken } from "remix-utils";
import { useFetcher } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "~/pages/Admin/Orders/OrderEdit";
import type { TForm, TOptionsSubmitForm } from "~/pages/Admin/Orders/OrderEdit";
import {
  orderEditItemsTableLinks,
  OrderEditItemsTable,
} from "~/pages/Admin/Orders/OrderEditItemsTable";
import type { TOrderDetail } from "~/shared/api/orders";
import { getFetcherOptions } from "~/shared/fetcher";
import { EFormMethods, Form, useInitForm } from "~/shared/form";
import type { TDomainErrors, TParams } from "~/types";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./OrderEdit.css";

type TProps = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  order: TOrderDetail;
  success?: boolean;
};

export const OrderEdit: FC<TProps> = (props) => {
  const csrf = useAuthenticityToken();
  const { t } = useTranslation();
  const fetcherRemix = useFetcher();
  const { isLoading } = getFetcherOptions(fetcherRemix);
  const order: TOrderDetail = fetcherRemix.data?.order ?? props.order;
  console.log("order: ", order);

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    console.log("Form params: ", params);
  };

  return (
    <section>
      <h1 className="OrderEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.orderEdit.title")}
        </Typography>
      </h1>
      <Form<TForm>
        className="OrderEdit-Form"
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Patch}
      >
        <OrderEditItemsTable
          fieldsSortState={{
            columns: [],
            multiple: false,
            onChangeSorting: () => {},
          }}
          isLoading={isLoading}
          items={order?.items ?? []}
        />
      </Form>
    </section>
  );
};

export function orderEditLinks() {
  return [{ rel: "stylesheet", href: styles }, ...orderEditItemsTableLinks()];
}
