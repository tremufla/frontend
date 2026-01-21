"use client";

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';

export type MapButton = {
  id?: string;
  label: string;
  title?: string;
  onClick: () => void;
};

type Props = {
  buttons: MapButton[];
  // posição do controle no mapa (opcional)
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  // espaço entre os botões
  gap?: string;
  // deslocamento superior para empurrar abaixo do zoom control quando necessário
  marginTop?: string;
};

export default function MapControlButtons({
  buttons,
  position = 'topleft',
  gap = '8px',
  marginTop = '100px',
}: Props) {
  const map = useMap();

  useEffect(() => {
    if (!map || !buttons || buttons.length === 0) return;

    const container = document.createElement('div');
    // usar classes do Leaflet para herdar aparência/posicionamento
    container.className = `leaflet-control leaflet-bar custom-map-buttons`;
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = gap;
    container.style.marginTop = marginTop;

    const makeButton = (b: MapButton) => {
      const a = document.createElement('a');
      if (b.id) a.id = b.id;
      a.innerHTML = b.label;
      a.href = '#';
      if (b.title) a.title = b.title;

      // prevenir que o clique alcance o mapa
      a.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          // tentar também usar utilitários do Leaflet
          if (L && L.DomEvent && typeof L.DomEvent.stop === 'function') {
            (L.DomEvent.stop as unknown as (ev: Event) => void)(e as unknown as Event);
          }
        } catch {
          // noop
        }
        b.onClick();
      });

      return a;
    };

    buttons.forEach((b) => container.appendChild(makeButton(b)));

    // anexar ao canto escolhido; se não encontrar, usar o container do mapa
    const mapContainer = map.getContainer();
    const cornerSelector = position === 'topleft'
      ? '.leaflet-top.leaflet-left'
      : position === 'topright'
      ? '.leaflet-top.leaflet-right'
      : position === 'bottomleft'
      ? '.leaflet-bottom.leaflet-left'
      : '.leaflet-bottom.leaflet-right';

    const corner = mapContainer.querySelector(cornerSelector) as HTMLElement | null;
    const parent = corner ?? mapContainer;
    parent.appendChild(container);

    return () => {
      container.remove();
    };
  }, [map, buttons, gap, marginTop, position]);

  return null;
}
