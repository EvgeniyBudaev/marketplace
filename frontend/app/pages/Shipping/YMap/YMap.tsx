import {useState} from "react";
import type {FC, ReactNode} from "react";
import {YMaps} from "@pbe/react-yandex-maps";
import {Shipping} from "~/pages";
import {mapInputLinks} from "~/pages/Shipping/YMap/MapInput";
import {markerLinks} from "~/pages/Shipping/YMap/Marker";
import {emptyMapSearchState, geoSearchLinks} from "~/pages";
import type {TPickMapState} from "~/pages";
import styles from "./YMap.css";

type TProps = {
  onSearchAddress?: (addressYMap: string) => void;
  children?: ReactNode;
};

export const YMap: FC<TProps> = () => {
  const query = "Москва, Россия";
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
        searchState={searchState}
        setSearchState={setSearchState}
        mapState={mapState}
        setMapState={setMapState}
      />
    </YMaps>
  );
};

export function yMapLinks() {
  return [
    {rel: "stylesheet", href: styles},
    ...geoSearchLinks(),
    ...mapInputLinks(),
    ...markerLinks(),
  ];
}
