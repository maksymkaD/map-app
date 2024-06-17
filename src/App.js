import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import React, { useState, useEffect } from 'react';
import L from 'leaflet';

const Routing = ({ startPoint, endPoint }) => {
  const map = useMap();

  useEffect(() => {
    if (!startPoint || !endPoint) return;
    
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(startPoint), L.latLng(endPoint)],
      routeWhileDragging: true,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }]
      },
      addWaypoints: false,
      draggableWaypoints: false
    }).addTo(map);
    
    return () => {
      if(!map || !routingControl) return;
      return map.removeControl(routingControl)
    };
  }, [map, startPoint, endPoint]);

  return null;
};

function App() {
  const [startPoint, setStartPoint] = useState([50.4501, 30.5234]);
  const [endPoint, setEndPoint] = useState([50.4501, 30.5234]);

  const handleStartPointChange = (event) => {
    const { value } = event.target;
    const [lat, lng] = value.split(',');
    if (isNaN(lat) || isNaN(lng)) return;
    setStartPoint([Number(lat), Number(lng)]);
  };

  const handleEndPointChange = (event) => {
    const { value } = event.target;
    const [lat, lng] = value.split(',');
    if (isNaN(lat) || isNaN(lng)) return;
    setEndPoint([Number(lat), Number(lng)]);
  };

  return (
    <div>
      <h1>Path Finder</h1>
      <div>
        <label htmlFor="startPoint">Start Point:</label>
        <input type="text" id="startPoint" value={startPoint.join(',')} onChange={handleStartPointChange} />
      </div>
      <div>
        <label htmlFor="endPoint">End Point:</label>
        <input type="text" id="endPoint" value={endPoint.join(',')} onChange={handleEndPointChange} />
      </div>
      <MapContainer center={startPoint} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={startPoint}>
          <Popup>Start Point</Popup>
        </Marker>
        <Marker position={endPoint}>
          <Popup>End Point</Popup>
        </Marker>
        <Routing startPoint={startPoint} endPoint={endPoint} />
      </MapContainer>
    </div>
  );
}

export default App;
