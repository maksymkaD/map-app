import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import React, { useState, useEffect } from 'react';
import L from 'leaflet';

const Routing = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if(points.length < 2) return;
    
    const routingControl = L.Routing.control({
      waypoints: [...points],
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
  }, [map, points]);

  return null;
};

const InputPoint = ({ label, point, setPoint }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    const [lat, lng] = value.split(',');
    if (isNaN(lat) || isNaN(lng)) return;
    setPoint([Number(lat), Number(lng)]);
  };

  return (
    <div>
      <label htmlFor={label}>{label}:</label>
      <input type="text" id={label} value={point.join(',')} onChange={handleChange} />
    </div>
  );
};

const App = ({ initialStartPoint, initialEndPoint }) => {
  const [startPoint, setStartPoint] = useState(initialStartPoint);
  const [endPoint, setEndPoint] = useState(initialEndPoint);
  return (
    <div>
      <h1>Path Finder</h1>
      <InputPoint label="Start Point" point={startPoint} setPoint={setStartPoint} />
      <InputPoint label="End Point" point={endPoint} setPoint={setEndPoint} />
      <MapContainer className='Map' center={startPoint} >
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
        <Routing points={[startPoint,endPoint]} />
      </MapContainer>
    </div>
  );
}

export default App;