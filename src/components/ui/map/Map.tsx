'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { CenterMap } from './CenterMap';
import { usePropertyStore } from '@/store/property-store';
import FarmIcon from './FarmIcon';
import * as L from 'leaflet';
import type { LatLng } from 'leaflet';
import { useEffect } from 'react';
import FarmerIcon from './FarmerIcon';
import MapControlButtons, { MapButton } from './MapControlButtons';
import { CalendarPlus2, MapPin } from 'lucide-react';
import { PropertyModel } from '@/domain/models/property-model';
import { ApplicationScheduleByRiskModel } from '@/domain/models/application-schedule-by-risk-model';
import { useGeolocationStore } from '@/store/geolocation-store';

type Props = {
  properties?: PropertyModel[];
  scheduleData?: ApplicationScheduleByRiskModel;
};

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

const renderPropertyMarkers = (properties?: PropertyModel[]) => {
  return properties?.map((property) => (
    <Marker key={property.id} position={[property.latitude, property.longitude]} icon={FarmIcon}>
      <Popup>
        <div className="text-sm">
          <div className="font-semibold">{property.name}</div>
          <div>
            {property.city}, {property.state}
          </div>
        </div>
      </Popup>
    </Marker>
  ));
};

export default function Map({ properties }: Props) {
  const { coordinates } = usePropertyStore();
  const { coordinates: userLocation, fetchPosition } = useGeolocationStore();

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  const userCoordinates: [number, number] | null = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : null;

  const initialCenter: [number, number] = userCoordinates ?? coordinates ?? [0, 0];

  return (
    <div className="h-full">
      <MapContainer
        center={initialCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userCoordinates && !coordinates && <CenterMap coordinates={userCoordinates} />}
        {coordinates && (
          <>
            <Marker key={0} position={coordinates} icon={FarmerIcon}>
              <Popup>Local selecionado</Popup>
            </Marker>
            <CenterMap coordinates={coordinates} />
          </>
        )}
        {renderPropertyMarkers(properties)}
        <HandleMapClick />
        <MapControlButtons
          buttons={
            [
              { icon: <MapPin className="w-6 h-6" />, title: 'Meus locais', onClick: () => console.log('meus locais') },
              { icon: <CalendarPlus2 className="w-6 h-6" />, title: 'Agendamentos', onClick: () => console.log('agendamentos') },
            ] as MapButton[]
          }
          position="topleft"
          gap="16px"
          marginTop="36px"
        />
      </MapContainer>
    </div>
  );
}
