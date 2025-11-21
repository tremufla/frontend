// CenterMap.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface CenterMapProps {
  coordinates: [number, number];
}

export function CenterMap({ coordinates }: CenterMapProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates, map.getZoom());
  }, [coordinates, map]);

  return null;
}
