import { useState } from "react";
import type { FC, ReactNode } from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import { Shipping, emptyMapSearchState, geoSearchLinks } from "#app/pages";
import { mapInputLinks } from "#app/pages/Shipping/YMap/MapInput";
import { markerLinks } from "#app/pages/Shipping/YMap/Marker";
import type { TPickMapState } from "#app/pages";
import type { TShipping } from "#app/shared/api/shipping";
import type { TDomainErrors } from "#app/types";
import styles from "./YMap.css";

type TProps = {
  children?: ReactNode;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  onSearchAddress?: (addressYMap: string) => void;
  shipping?: TShipping;
  success: boolean;
  uuid: string;
};

export const YMap: FC<TProps> = ({
  fieldErrors,
  formError,
  shipping,
  success,
  uuid,
}) => {
  const query = shipping?.address ?? "Москва, Россия";
  const [searchState, setSearchState] = useState({
    ...emptyMapSearchState(),
    value: query,
  });
  const [mapState, setMapState] = useState<TPickMapState>(query);

  return (
    <YMaps
      query={{
        apikey: "5a50ba23-ce9a-45cd-be41-849e6f0c3f1e",
        lang: "ru_RU",
        mode: "release",
      }}
    >
      <Shipping
        fieldErrors={fieldErrors}
        formError={formError}
        mapState={mapState}
        searchState={searchState}
        setMapState={setMapState}
        setSearchState={setSearchState}
        shipping={shipping}
        success={success}
        uuid={uuid}
      />
    </YMaps>
  );
};

export function yMapLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...geoSearchLinks(),
    ...mapInputLinks(),
    ...markerLinks(),
  ];
}
