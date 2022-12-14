import type { ComponentType } from "react";
import { Fragment } from "react";
import { useCatch } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Error as ErrorComponent } from "~/components";
import type { TCatchBoundaryMessage, TCatchBoundaryStatusMap, TWithChildrenProps } from "./types";
import { DEFAULT_STATUS_MAP, DEFAULT_STATUS_MESSAGE } from "./constants";

export type TCreateCatchBoundaryParams = {
  statusMap?: TCatchBoundaryStatusMap;
  defaultMessage?: TCatchBoundaryMessage;
  defaultStatusMessage?: TCatchBoundaryMessage;
  Layout?: ComponentType<TWithChildrenProps>;
};

export const createCatchBoundary = ({
  statusMap,
  Layout = Fragment,
  defaultMessage,
  defaultStatusMessage = DEFAULT_STATUS_MESSAGE,
}: TCreateCatchBoundaryParams = {}): ComponentType => {
  return () => {
    const caught = useCatch();
    const { t } = useTranslation();
    statusMap = new Map([...DEFAULT_STATUS_MAP, ...(statusMap ?? [])]);
    const statusMapItem = statusMap?.get(caught.status);
    const statusMapMessage = typeof statusMapItem !== "function" ? statusMapItem : statusMapItem(t);
    const formattedDefaultMessage =
      typeof defaultMessage !== "function" ? defaultMessage : defaultMessage(t);
    const formattedDefaultStatusMessage =
      typeof defaultStatusMessage !== "function" ? defaultStatusMessage : defaultStatusMessage(t);

    const message =
      statusMapMessage ||
      caught.data ||
      formattedDefaultMessage ||
      `${formattedDefaultStatusMessage}: ${caught.status}`;

    const error = new Error(message);

    return (
      <Layout>
        <ErrorComponent caught={caught} error={error} />
      </Layout>
    );
  };
};
