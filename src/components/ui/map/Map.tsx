"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { CenterMap } from "./CenterMap";
import { usePropertyStore } from "@/store/property-store";
import FarmIcon from "./FarmIcon";
import L, { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import FarmerIcon from "./FarmerIcon";
import { PropertyModel } from '@/domain/models/property-model'

type Coordinates = [number, number];

type Props = {
  properties?: PropertyModel[]
}

const HandleMapClick = () => {
  const { coordinates } = usePropertyStore();

  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(coordinates);

  const map = useMap();

  const handleClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng }: LatLng = e.latlng;
    setMarkerPosition([lat, lng]);
  };

  useEffect(() => {
    if (map) {
      map.on('click', handleClick);
    }

    return () => {
      if (map) {
        map.off('click', handleClick);
      }
    };
  }, [map]);

  return (
    <>
      {markerPosition && (
        <Marker position={markerPosition} icon={FarmerIcon}>
          <Popup>{`Latitude: ${markerPosition[0]} - Longitude: ${markerPosition[1]}`}</Popup>
        </Marker>
      )}
    </>
  );
};

export default function Map({ properties }: Props) {
  const { coordinates } = usePropertyStore()

  return (
    <div className="relative h-[calc(100vh-theme(spacing.32))]">
      <MapContainer
        center={coordinates ?? [0, 0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates && (
          <>
            <Marker key={0} position={coordinates} icon={FarmerIcon}>
              <Popup>Local selecionado</Popup>
            </Marker>
            <CenterMap coordinates={coordinates} />
          </>
        )}
        {properties?.map((p) => (
          <Marker key={p.id} position={[p.latitude, p.longitude]} icon={FarmIcon}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{p.name}</div>
                <div>{p.city}, {p.state}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        <HandleMapClick />
      </MapContainer>
    </div>
  );
}
