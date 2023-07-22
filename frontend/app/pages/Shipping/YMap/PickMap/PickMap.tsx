import {memo, useCallback, useEffect, useMemo, useRef} from "react";
import type {ReactNode, ComponentProps} from "react";
import {Map, withYMaps} from "@pbe/react-yandex-maps";
import {useDebounce} from "use-debounce";

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

export default memo(
  withYMaps(
    function PickMap(props: TPickMapProps) {
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
        defaultState,
        style,
        ...mapProps
      } = props;

      const [debouncedState] = useDebounce(state, debounce ?? 0);
      const prevCoords = useRef<[number, number] | undefined>(undefined);
      const prevAddress = useRef<string | undefined>(undefined);
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
            ymaps
              .search(trimmed, {
                options: {
                  provider: "yandex#map",
                },
              })
              .then((response: any) => {
                if (!cancelled) {
                  const queryCoords = response?.geoObjects?.get(0)?.geometry?.getCoordinates();
                  prevAddress.current = trimmed;

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

      const handleMapRef = useCallback(
        (ref: any) => {
          if (map.current !== ref) {
            map.current = ref;

            ref?.events.add(["multitouchend", "actionend"], (event: any) => {
              if (isUserInteractionEvent(event)) {
                onStateChange(ref.getCenter());
                onDragEnd?.();
              }
            });

            ref?.events.add(["multitouchbegin", "actionbegin"], (event: any) => {
              if (isUserInteractionEvent(event)) {
                onDragStart?.();
              }
            });
          }
        },
        [onDragStart, onDragEnd, onStateChange],
      );

      const mapStyle = useMemo(
        () => ({
          ...style,
          position: "relative",
        }),
        [style],
      );

      return (
        <Map {...mapProps} defaultState={defaultState} instanceRef={handleMapRef} style={mapStyle}>
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
  ),
);
