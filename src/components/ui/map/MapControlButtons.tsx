'use client';

import React, { useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';

export type MapButton = {
  id?: string;
  // se icon for provido, será renderizado; caso contrário, label como fallback
  icon?: React.ReactNode;
  label?: string;
  title?: string;
  onClick: () => void;
};

type Props = {
  buttons: MapButton[];
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  gap?: string;
  marginTop?: string;
};

function ButtonsUI({ buttons, gap }: { buttons: MapButton[]; gap: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {buttons.map((b, i) => (
        <a
          key={b.id ?? i}
          href="#"
          title={b.title}
          className="leaflet-control-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const ev = (e.nativeEvent as unknown) as Event;
            try {
              if (L?.DomEvent && typeof L.DomEvent.stop === 'function') {
                (L.DomEvent.stop as unknown as (ev2: Event) => void)(ev);
              }
            } catch {
              // ignore
            }
            b.onClick();
          }}
        >
          {b.icon ?? b.label}
        </a>
      ))}
    </div>
  );
}

export default function MapControlButtons({ buttons, position = 'topleft', gap = '8px', marginTop = '100px' }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!map || buttons.length === 0) return;

    const controlContainer = document.createElement('div');
    controlContainer.className = 'leaflet-control leaflet-bar custom-map-buttons';
    controlContainer.style.marginTop = marginTop;

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

    const root: Root = createRoot(controlContainer);
    root.render(<ButtonsUI buttons={buttons} gap={gap} />);

    return () => {
      try {
        setTimeout(() => {
          try {
            root.unmount();
          } catch { }
          controlContainer.remove();
        }, 0);
      } catch {
        try {
          root.unmount();
        } catch { }

        controlContainer.remove();
      }
    };
  }, [map, buttons, gap, marginTop, position]);

  return null;
}
