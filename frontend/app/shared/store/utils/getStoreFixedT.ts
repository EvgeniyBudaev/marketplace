import type { TFunction } from "i18next";
import { remixI18next } from "#app/services";
import { getStoreLanguage, parseAcceptLanguage } from "#app/shared/store";

const DEFAULT_NAMESPACE = "index";

type TProps = {
  namespaces?: string | string[];
  request: Request;
  uuid?: string;
};

type TGetStoreFixedT = (props: TProps) => Promise<TFunction>;

export const getStoreFixedT: TGetStoreFixedT = async ({
  request,
  namespaces = DEFAULT_NAMESPACE,
  uuid,
}) => {
  const language = await getStoreLanguage({ request, uuid });

  return remixI18next.getFixedT(
    language?.toLowerCase() ?? parseAcceptLanguage(request),
    namespaces
  );
};
