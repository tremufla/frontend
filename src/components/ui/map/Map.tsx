'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { CenterMap } from './CenterMap';
import { usePropertyStore } from '@/store/property-store';
import FarmIcon from './FarmIcon';
import * as L from 'leaflet';
import type { LatLng } from 'leaflet';
import { useEffect } from 'react';
import FarmerIcon from './FarmerIcon';
import { PropertyModel } from '@/domain/models/property-model';
import { ApplicationScheduleByRiskModel } from '@/domain/models/application-schedule-by-risk-model';

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

  const MapButtons = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      // Criar container e botões diretamente no DOM do mapa para evitar problemas de tipagem
      const container = document.createElement('div');
      // usar classes do Leaflet para herdar estilos padrão e alinhamento com outros controles
      container.className = 'leaflet-control leaflet-bar custom-map-buttons';
      // organizar verticalmente e adicionar gap para separar dos outros controles
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';

      const makeButton = (label: string, title: string, onClick: () => void) => {
        const a = document.createElement('a');
        a.innerHTML = label;
        a.href = '#';
        a.title = title;
        // não sobrescrever o estilo do Leaflet (bordas, cursor, etc.) — usar estilos padrão
        a.addEventListener('click', (e) => {
          // impedir navegação padrão
          e.preventDefault();
          // impedir que o evento suba para o mapa (que tem um listener de click)
          e.stopPropagation();
          if (L && L.DomEvent && typeof L.DomEvent.stop === 'function') {
            // garantir que o Leaflet também pare o evento (compatibilidade)
            try {
              // L.DomEvent.stop aceita um Event, usar cast seguro
              (L.DomEvent.stop as unknown as (ev: Event) => void)(e as unknown as Event);
            } catch {
              // noop
            }
          }
          onClick();
        });

        return a;
      };

      // Example buttons (change labels/actions as needed)
      const btn1 = makeButton('Btn 1', 'Button 1', () => {
        console.log('Btn 1 clicked');
      });
      const btn2 = makeButton('Btn 2', 'Button 2', () => {
        console.log('Btn 2 clicked');
      });

      container.appendChild(btn1);
      container.appendChild(btn2);

      // Tenta anexar no canto superior-esquerdo do mapa (fallback para o container do mapa)
      const mapContainer = map.getContainer();
      const corner = mapContainer.querySelector('.leaflet-top.leaflet-left') as HTMLElement | null;
      const parent = corner ?? mapContainer;
      parent.appendChild(container);

      return () => {
        container.remove();
      };
    }, [map]);

    return null;
  };

  return (
    <div className="h-full">
      <MapContainer
        center={coordinates ?? [0, 0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
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
        {renderPropertyMarkers(properties)}
        <HandleMapClick />
        <MapButtons />
      </MapContainer>
    </div>
  );
}
