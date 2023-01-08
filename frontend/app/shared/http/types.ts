export type THeaders = Record<string, string>;

export type TRefreshAccessTokenReturn = {
  accessToken: string;
  headers: THeaders;
};
