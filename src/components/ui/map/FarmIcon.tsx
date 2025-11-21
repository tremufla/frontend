import React from 'react';

import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { PiFarm } from "react-icons/pi";

const FarmIcon: L.DivIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(
    <div style={{
      backgroundColor: '#34a853',
      border: '2px solid white',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 5px rgba(0,0,0,0.5)'
    }}>
      <PiFarm color="white" size={20} />
    </div>
  ),
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

export default FarmIcon;
