import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-routing-machine';
import React, { useState } from 'react';
import Routing from './Routing';
import InputPoint from './InputPoint';

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