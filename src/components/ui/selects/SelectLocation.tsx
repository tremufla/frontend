"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyStore } from "@/store/property-store";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface SelectLocationProps {
  locations: {
    id: string;
    name: string;
    coordinates: { latitude: number; longitude: number };
  }[];
}

const SelectLocation: React.FC<SelectLocationProps> = ({ locations }) => {
  const { setProperty, setCoordinates } = usePropertyStore();
  const [locationSelected, setLocationSelected] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<{
    id: string;
    name: string;
    coordinates: { latitude: number; longitude: number };
  } | null>(null);

  useEffect(() => {
    if (currentLocation) {
      setProperty(currentLocation.id);
      setLocationSelected(currentLocation.id);
      setCoordinates([
        currentLocation.coordinates.latitude,
        currentLocation.coordinates.longitude,
      ]);
    } else if (locations.length > 0) {
      const firstLocation = locations[0];
      setProperty(firstLocation.id);
      setLocationSelected(firstLocation.id);
      setCoordinates([
        firstLocation.coordinates.latitude,
        firstLocation.coordinates.longitude,
      ]);
    }
  }, [locations, setProperty, setCoordinates, currentLocation]);

  useEffect(() => {
    if (!navigator?.geolocation) return;

    let mounted = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!mounted) return;
        const { latitude, longitude } = pos.coords;
        setCurrentLocation({
          id: "current-location",
          name: "Minha localização",
          coordinates: { latitude, longitude },
        });
      },
      () => { },
      { enableHighAccuracy: true, maximumAge: 1000 * 60 * 5 }
    );

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (value: string) => {
    if (value === "current-location" && currentLocation) {
      setProperty(currentLocation.id);
      setLocationSelected(currentLocation.id);
      setCoordinates([
        currentLocation.coordinates.latitude,
        currentLocation.coordinates.longitude,
      ]);
      return;
    }

    const selectedLocation = locations.find((location) => location.id === value);

    const latitude = selectedLocation?.coordinates.latitude ?? 0;
    const longitude = selectedLocation?.coordinates.longitude ?? 0;

    if (selectedLocation) {
      setProperty(selectedLocation.id);
      setLocationSelected(selectedLocation.id);
      setCoordinates([latitude, longitude]);
    }
  };

  return (
    <Select value={locationSelected} onValueChange={handleChange}>
      <SelectTrigger className="w-full sm:w-[180px] md:w-[300px] lg:w-[250px] bg-white text-black border border-gray-300">
        <MapPin className="mr-2 h-4 w-4" />
        <SelectValue placeholder={"Escolha uma localização"} />
      </SelectTrigger>
      <SelectContent>
        {currentLocation && (
          <SelectItem
            key={currentLocation.id}
            data-coordinates={currentLocation.coordinates}
            value={currentLocation.id}
          >
            {currentLocation.name}
          </SelectItem>
        )}
        {locations.map((location) => (
          <SelectItem
            key={location.id}
            data-coordinates={location.coordinates}
            value={location.id}
          >
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectLocation;
