import React from 'react';

import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { GiFarmer } from "react-icons/gi";


const FarmerIcon: L.DivIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(
    <div style={{
      backgroundColor: '#1e90ff',
      border: '2px solid white',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 5px rgba(0,0,0,0.5)'
    }}>
      <GiFarmer color="white" size={20} />
    </div>
  ),
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

export default FarmerIcon;
