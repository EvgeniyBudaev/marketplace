import { ComponentProps, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Map, withYMaps } from "@pbe/react-yandex-maps";
import { useDebounce } from "use-debounce";

type MapProps = ComponentProps<typeof Map>;

export type TPickMapState = string | [number, number] | undefined;

type TPickMapProps = {
  debounce?: number;
  marker?: ReactNode;
  searchZoom?: number;
  state: TPickMapState;
  onDragEnd?: () => void;
  onDragStart?: () => void;
  onPick?: (address: string) => void;
  onStateChange: (state: TPickMapState) => void;
} & Omit<MapProps, "state">;

export function emptyPickMapState(): TPickMapState {
  return undefined;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUserInteractionEvent = (event: any) => {
  return event?.originalEvent?.action?._tickFiring !== false;
};

export default withYMaps(
  (props: TPickMapProps) => {
    const {
      children,
      debounce,
      marker,
      searchZoom,
      state,
      ymaps,
      onDragEnd,
      onDragStart,
      onStateChange,
      onPick,
      ...mapProps
    } = props;

    const [debouncedState] = useDebounce(state, debounce ?? 0);
    const prevCoords = useRef<[number, number] | undefined>(undefined);
    const prevAddress = useRef<string | undefined>(undefined);
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = useRef<any | undefined>(undefined);

    useEffect(() => {
      let cancelled = false;

      if (
        Array.isArray(debouncedState) &&
        !prevCoords.current?.some((coord, i) => debouncedState[i] === coord)
      ) {
        prevCoords.current = debouncedState;

        ymaps
          .geocode(debouncedState, {
            provider: "yandex#map",
            results: 1,
          })
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((response: any) => {
            if (!cancelled) {
              const address = response?.geoObjects?.get(0)?.getAddressLine();
              prevAddress.current = address;

              if (address != null) {
                onPick?.(address);
              }
            }
          });
      }

      return () => void (cancelled = true);
    }, [debouncedState, onStateChange, onPick, ymaps]);

    useEffect(() => {
      let cancelled = false;

      if (typeof state === "string") {
        const trimmed = state.trim();

        if (trimmed.length && trimmed !== prevAddress.current) {
          prevAddress.current = trimmed;

          ymaps
            .search(trimmed, {
              options: {
                provider: "yandex#map",
              },
            })
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((response: any) => {
              if (!cancelled) {
                const queryCoords = response?.geoObjects?.get(0)?.geometry?.getCoordinates();
                if (queryCoords?.length === 2) {
                  map.current?.setCenter(queryCoords);

                  if (searchZoom != null) {
                    map.current?.setZoom(searchZoom);
                  }
                }
              }
            });
        }
      }

      return () => void (cancelled = true);
    }, [state, ymaps, searchZoom]);

    return (
      <Map
        {...mapProps}
        instanceRef={(ref) => {
          mapProps.instanceRef?.(ref);

          if (map.current == null) {
            map.current = ref;
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            (ref as any)?.events.add(
              ["multitouchend", "actionend"],
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
              (event: any) => {
                if (isUserInteractionEvent(event)) {
                  //eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onStateChange((ref as any).getCenter());
                  onDragEnd?.();
                }
              },
            );
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            (ref as any)?.events.add(
              ["multitouchbegin", "actionbegin"],
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
              (event: any) => {
                if (isUserInteractionEvent(event)) {
                  onDragStart?.();
                }
              },
            );
          }
        }}
        style={{
          ...mapProps.style,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          {marker || (
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "red",
              }}
            />
          )}
        </div>
        {children}
      </Map>
    );
  },
  true,
  ["geocode", "search"],
);
