import React from 'react';

import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { PiTractorFill } from "react-icons/pi";

const iconConfig = [
  { type: 'safe', color: '#34a853', icon: <PiTractorFill color="white" size={20} /> },  // Verde - Seguro
  { type: 'caution', color: '#FFEB3B', icon: <PiTractorFill color="white" size={20} /> },  // Amarelo - Atenção
  { type: 'danger', color: '#F44336', icon: <PiTractorFill color="white" size={20} /> }   // Vermelho - Perigo
];

interface TractorIconProps {
  type: 'safe' | 'caution' | 'danger';
}

const TractorIcon = ({ type }: TractorIconProps): L.DivIcon => {
  const config = iconConfig.find((item) => item.type === type);

  if (!config) {
    throw new Error(`Invalid type: ${type}`);
  }

  return new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <div style={{
        backgroundColor: config.color,
        border: '2px solid white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 5px rgba(0,0,0,0.5)'
      }}>
        {config.icon}
      </div>
    ),
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

export default TractorIcon;
