import { PROXY_URL, ROUTER_PREFIX } from "~/constants";

type TUseProxyUrl = () => { proxyUrl: string };

export const useProxyUrl: TUseProxyUrl = () => {
  return { proxyUrl: ROUTER_PREFIX ? `${ROUTER_PREFIX}${PROXY_URL}` : PROXY_URL };
};
