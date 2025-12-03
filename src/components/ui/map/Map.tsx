"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { CenterMap } from "./CenterMap";
import { usePropertyStore } from "@/store/property-store";
import FarmIcon from "./FarmIcon";
import L, { LatLng } from "leaflet";
import { useEffect } from "react";
import FarmerIcon from "./FarmerIcon";
import { PropertyModel } from '@/domain/models/property-model'

type Props = {
  properties?: PropertyModel[]
}

const HandleMapClick = () => {
  const { setCoordinates, setProperty } = usePropertyStore();

  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleClick = (event: L.LeafletMouseEvent) => {
      const { lat, lng }: LatLng = event.latlng;
      setProperty(null);
      setCoordinates([lat, lng]);
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, setProperty, setCoordinates]);

  return null;
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
        {properties?.map((property) => (
          <Marker key={property.id} position={[property.latitude, property.longitude]} icon={FarmIcon}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{property.name}</div>
                <div>{property.city}, {property.state}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        <HandleMapClick />
      </MapContainer>
    </div>
  );
}
