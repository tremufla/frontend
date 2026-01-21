'use client';

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

export default function MapControlButtons({ buttons, position = 'topleft', gap = '8px', marginTop = '100px' }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!map || buttons.length === 0) return;

    const controlContainer = document.createElement('div');
    controlContainer.className = 'leaflet-control leaflet-bar custom-map-buttons';
    controlContainer.style.display = 'flex';
    controlContainer.style.flexDirection = 'column';
    controlContainer.style.gap = gap;
    controlContainer.style.marginTop = marginTop;

    const createControlButton = (btn: MapButton) => {
      const anchor = document.createElement('a');
      if (btn.id) anchor.id = btn.id;
      anchor.innerHTML = btn.label;
      anchor.href = '#';
      if (btn.title) anchor.title = btn.title;

      const onClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          if (L?.DomEvent && typeof L.DomEvent.stop === 'function') {
            (L.DomEvent.stop as unknown as (ev: Event) => void)(e);
          }
        } catch {
          // ignore
        }
        btn.onClick();
      };

      anchor.addEventListener('click', onClick);
      return anchor;
    };

    buttons.forEach((b) => controlContainer.appendChild(createControlButton(b)));

    const leafletContainer = map.getContainer();
    const cornerSelector =
      position === 'topleft'
        ? '.leaflet-top.leaflet-left'
        : position === 'topright'
        ? '.leaflet-top.leaflet-right'
        : position === 'bottomleft'
        ? '.leaflet-bottom.leaflet-left'
        : '.leaflet-bottom.leaflet-right';

    const corner = leafletContainer.querySelector(cornerSelector) as HTMLElement | null;
    const parent = corner ?? leafletContainer;
    parent.appendChild(controlContainer);

    return () => controlContainer.remove();
  }, [map, buttons, gap, marginTop, position]);

  return null;
}
