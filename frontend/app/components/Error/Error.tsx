import type { FC } from "react";
import type { ThrownResponse } from "@remix-run/react";
import { useTranslation } from "react-i18next";

type TProps = {
  caught?: ThrownResponse<number, any>;
  error?: Error;
  message?: string;
};

const JSON_FORMAT_SPACE_COUNT = 4;

export const Error: FC<TProps> = ({ message, caught, error }) => {
  const { t } = useTranslation();
  const isDev = process.env.NODE_ENV === "development";
  const errorMessage = message || error?.message || t("errorBoundary.common.unexpectedError");
  let formattedCaughtData: string | null = null;

  if (isDev && caught?.data) {
    try {
      const parsedData = JSON.parse(caught.data);

      formattedCaughtData = JSON.stringify(parsedData, undefined, JSON_FORMAT_SPACE_COUNT);
    } catch (error) {
      formattedCaughtData = caught.data;
    }
  }

  return (
    <div className="bg-grey-light flex-1">
      <div className="bg-error-light bg-red rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            {/*TODO: Добавить иконку*/}
            Icon type Error
          </div>
          <div className="ml-3">
            {isDev ? (
              <>
                <h3 className="text-error-dark mb-2 text-sm font-medium">{errorMessage}</h3>
                {caught && (
                  <div className="text-error-dark mb-2 text-sm font-medium">
                    <div>Status code: {caught.status || "-"}</div>
                    <div>Status text: {caught.statusText || "-"}</div>
                    <pre className="whitespace-pre-wrap">Data: {formattedCaughtData ?? "-"}</pre>
                  </div>
                )}
                <div className="text-error-dark text-sm">{error?.stack}</div>
              </>
            ) : (
              <h3 className="text-error-dark text-sm font-medium">{errorMessage}</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
