import { useEffect, useMemo, useRef } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { Stop, TravelMode } from "../data/stops";

interface Props {
  stops: Stop[];
  currentIndex: number;
  hoveredIndex: number | null;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
  /** Changes when the active tab changes; triggers a Leaflet resize fix
   *  after the container is un-hidden on mobile. */
  revision?: string;
}

const TILE_URL =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const ALASKA_CENTER: [number, number] = [61.5, -150];

export function MapView(props: Props) {
  const { stops } = props;

  // Initial bounds — fit all stops with padding.
  const bounds = useMemo<L.LatLngBoundsExpression>(() => {
    return stops.map((s) => [s.lat, s.lng]);
  }, [stops]);

  return (
    <MapContainer
      center={ALASKA_CENTER}
      zoom={6}
      bounds={bounds as L.LatLngBoundsExpression}
      boundsOptions={{ padding: [40, 40] }}
      scrollWheelZoom
      zoomControl
      className="h-full w-full"
      attributionControl
      // Canvas renderer: `tolerance` adds a 12px tap halo around every
      // circle marker / polyline — SVG hit-testing has no slop concept,
      // and the 18px markers are too small for thumbs without it.
      renderer={L.canvas({ tolerance: 12 })}
    >
      {/* crossOrigin is load-bearing: without it the service worker caches
          tiles as opaque responses, which browsers quota-account at ~7 MB
          each — a few hundred tiles would blow the origin's storage. */}
      <TileLayer url={TILE_URL} attribution={TILE_ATTR} maxZoom={19} crossOrigin />
      <RouteLines {...props} />
      <Markers {...props} />
      <CurrentHalo
        position={[stops[props.currentIndex].lat, stops[props.currentIndex].lng]}
      />
      <PanToSelected {...props} />
      <RevalidateSize revision={props.revision} />
    </MapContainer>
  );
}

/* Re-measure after the container is shown again (mobile tab switches put it
 * through display:none, which leaves Leaflet with a stale/zero size). */
function RevalidateSize({ revision }: { revision?: string }) {
  const map = useMap();
  useEffect(() => {
    const id = setTimeout(() => map.invalidateSize(), 80);
    return () => clearTimeout(id);
  }, [revision, map]);
  return null;
}

/* --------------------------------------------------------------------- */
/* Markers                                                                */
/* --------------------------------------------------------------------- */

function Markers({
  stops,
  currentIndex,
  hoveredIndex,
  onSelect,
  onHover,
}: Props) {
  return (
    <>
      {stops.map((s, i) => {
        const isCurrent = i === currentIndex;
        const isVisited = i < currentIndex;
        const isHovered = i === hoveredIndex;

        let radius = 5;
        let fillColor = "#ffffff";
        let color = "#9ca3af";
        let weight = 2;
        let fillOpacity = 1;

        if (isVisited) {
          fillColor = "#3b82f6";
          color = "#ffffff";
          radius = 6;
        }
        if (isCurrent) {
          fillColor = "#2563eb";
          color = "#ffffff";
          radius = 9;
        }
        if (isHovered && !isCurrent) {
          radius += 2;
          color = "#2563eb";
        }
        if (s.highlight && !isCurrent) {
          color = "#d97706";
          weight = 2;
        }

        return (
          <CircleMarker
            key={s.index}
            center={[s.lat, s.lng]}
            radius={radius}
            pathOptions={{
              color,
              fillColor,
              fillOpacity,
              weight,
            }}
            pane={isCurrent ? "markerPane" : "overlayPane"}
            eventHandlers={{
              click: () => onSelect(i),
              mouseover: () => onHover(i),
              mouseout: () => onHover(null),
            }}
          />
        );
      })}
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Polylines                                                              */
/* --------------------------------------------------------------------- */

function RouteLines({ stops, currentIndex }: Props) {
  const segments = useMemo(() => {
    const out: {
      key: string;
      positions: [number, number][];
      mode: TravelMode;
      visited: boolean;
    }[] = [];
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      if (a.lat === b.lat && a.lng === b.lng) continue;

      const mode = b.mode;
      const visited = i + 1 <= currentIndex;
      const positions: [number, number][] =
        mode === "fly"
          ? greatCircle([a.lat, a.lng], [b.lat, b.lng], 48)
          : [
              [a.lat, a.lng],
              [b.lat, b.lng],
            ];

      out.push({ key: `${i}-${i + 1}`, positions, mode, visited });
    }
    return out;
  }, [stops, currentIndex]);

  return (
    <>
      {segments.map((seg) => (
        <Polyline
          key={seg.key}
          positions={seg.positions}
          pathOptions={lineStyle(seg.mode, seg.visited)}
        />
      ))}
    </>
  );
}

function lineStyle(mode: TravelMode, visited: boolean): L.PathOptions {
  const color = visited ? "#3b82f6" : "#cbd5e1";
  const weight = visited ? 3 : 2;
  const opacity = visited ? 0.95 : 0.8;

  // Dash patterns by travel mode. Drive = solid for visited, dashed for future.
  let dashArray: string | undefined;
  if (mode === "drive") dashArray = visited ? undefined : "6 6";
  else if (mode === "bus") dashArray = "4 6";
  else if (mode === "boat") dashArray = "2 8";
  else if (mode === "fly") dashArray = "2 8";

  return { color, weight, opacity, dashArray };
}

/* --------------------------------------------------------------------- */
/* Current-stop halo (pulsing)                                            */
/* --------------------------------------------------------------------- */

function CurrentHalo({ position }: { position: [number, number] }) {
  const icon = useMemo(
    () =>
      L.divIcon({
        html: '<div class="halo"></div>',
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    [],
  );
  return (
    <Marker
      position={position}
      icon={icon}
      interactive={false}
      keyboard={false}
    />
  );
}

/* --------------------------------------------------------------------- */
/* Pan to selected (smooth)                                               */
/* --------------------------------------------------------------------- */

function PanToSelected({ stops, currentIndex }: Props) {
  const map = useMap();
  const lastIndex = useRef<number>(currentIndex);
  const initialized = useRef(false);

  useEffect(() => {
    // Skip the very first call — let `bounds` handle initial framing.
    if (!initialized.current) {
      initialized.current = true;
      lastIndex.current = currentIndex;
      return;
    }
    lastIndex.current = currentIndex;

    const s = stops[currentIndex];
    const targetZoom = Math.max(map.getZoom(), 8);
    map.flyTo([s.lat, s.lng], targetZoom, {
      animate: true,
      duration: 0.8,
      easeLinearity: 0.25,
    });
  }, [currentIndex, stops, map]);

  return null;
}

/* --------------------------------------------------------------------- */
/* Great-circle helper                                                    */
/* --------------------------------------------------------------------- */

function greatCircle(
  p1: [number, number],
  p2: [number, number],
  n: number,
): [number, number][] {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const [lat1, lng1] = [toRad(p1[0]), toRad(p1[1])];
  const [lat2, lng2] = [toRad(p2[0]), toRad(p2[1])];
  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2,
      ),
    );

  // Degenerate (same point) — just return endpoints
  if (d === 0) return [p1, p2];

  const out: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
    const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    const lng = Math.atan2(y, x);
    out.push([toDeg(lat), toDeg(lng)]);
  }
  return out;
}
