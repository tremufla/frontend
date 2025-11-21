"use client";

import Header from "@/components/ui/header/hearder";
import NewPulverizationPopover from "@/components/ui/popovers/NewPulverizationPopover";
import SelectLocation from "@/components/ui/selects/SelectLocation";
import { useGeolocationStore } from "@/store/geolocation-store";
import { useEffect, useMemo } from "react";

const staticLocations = [
  {
    id: "b8389d16-3e43-4207-a02f-45f821b39042",
    name: "Fazenda Sol Nascente",
    coordinates: {
      latitude: -21.232089043346647,
      longitude: -44.99445408674582,
    },
  },
  {
    id: "190cf364-9e35-4ce6-bc48-e7a0821a6db2",
    name: "Fazenda Laranjal",
    coordinates: {
      latitude: -21.161141367126774,
      longitude: -44.92431764431109,
    },
  },
];

export default function MapHeader() {
  const { coordinates, fetchPosition } = useGeolocationStore();

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  const allLocations = useMemo(() => {
    if (!coordinates) return staticLocations;

    return [
      {
        id: "399821bb-1db2-40ac-9705-7507681d47dc",
        name: "Minha localização",
        coordinates: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
      },
      ...staticLocations,
    ];
  }, [coordinates]);

  return (
    <Header title="Mapa de Pulverizações">
      <SelectLocation locations={allLocations} />
      <NewPulverizationPopover />
    </Header>
  );
}
