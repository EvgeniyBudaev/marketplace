import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {Icon} from "~/uikit";
import styles from "./Error.css";

type TProps = {
  caught?: any; // caught?: ThrownResponse<number, any>; import type {ThrownResponse} from "@remix-run/react";
  error?: Error;
  message?: string;
};

const JSON_FORMAT_SPACE_COUNT = 4;

export const Error: FC<TProps> = ({message, caught, error}) => {
  const {t} = useTranslation();
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
    <section className="Error">
      <div className="Error-Inner">
        <div className="Error-Content">
          <div className="Error-IconBox">
            <Icon className="Error-Icon" type="Attention"/>
          </div>
          <div className="Error-Message">
            {isDev ? (
              <>
                <h3 className="Error-Title">{errorMessage}</h3>
                {caught && (
                  <div className="Error-Caught">
                    <div>Status code: {caught.status || "-"}</div>
                    <div>Status text: {caught.statusText || "-"}</div>
                    <pre className="Error-CaughtFormatted">Data: {formattedCaughtData ?? "-"}</pre>
                  </div>
                )}
                <div className="Error-Stack">{error?.stack}</div>
              </>
            ) : (
              <h3 className="Error-TitleProd">{errorMessage}</h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export function errorLinks() {
  return [{rel: "stylesheet", href: styles}];
}
