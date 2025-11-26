"use client";

import Header from "@/components/ui/header/hearder";
import NewPulverizationPopover from "@/components/ui/popovers/NewPulverizationPopover";
import SelectLocation from "@/components/ui/selects/SelectLocation";
import { useGeolocationStore } from "@/store/geolocation-store";
import { useEffect, useMemo, useState } from "react";
import { PropertyModel } from '@/domain/models/property-model'

export default function MapHeader() {
  const { coordinates, fetchPosition } = useGeolocationStore();
  const [properties, setProperties] = useState<PropertyModel[] | null>(null)

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        const res = await fetch('/api/properties')
        if (!mounted) return
        if (!res.ok) return
        const data = await res.json()
        setProperties(data)
      } catch (err) {
        // ignore for now
        console.error(err)
      }
    }

    load()

    return () => { mounted = false }
  }, [])

  const allLocations = useMemo(() => {
  const list = [] as { id: string; name: string; coordinates: { latitude: number; longitude: number } }[]

    if (coordinates) {
      list.push({
        id: '399821bb-1db2-40ac-9705-7507681d47dc',
        name: 'Minha localização',
        coordinates: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
      })
    }

    if (properties && Array.isArray(properties)) {
      for (const p of properties) {
        list.push({ id: p.id, name: p.name, coordinates: { latitude: p.latitude, longitude: p.longitude } })
      }
    }

      return list
  }, [coordinates, properties]);

  return (
    <Header title="Mapa de Pulverizações">
      <SelectLocation locations={allLocations} />
      <NewPulverizationPopover />
    </Header>
  );
}
