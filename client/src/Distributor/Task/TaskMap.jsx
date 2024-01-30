import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customicon from './shops.jpg';

// Example custom marker icon
const customMarker = new L.Icon({
  iconUrl: customicon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const TaskMap = ({ officer }) => {
  const { latitude, longitude } = officer;

  return (
    <div style={{ height: '600px', width: '800px' }}>
      {officer ? (
        <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} icon={customMarker}>
            <Popup>Shop</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div>No officer data available</div>
      )}
    </div>
  );
};

export default TaskMap;
