import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle } from "react-leaflet";
import './App.css';

const App = () => {
  const position = [-36.21768, -61.11467];
  const mapsposition = [-36.2205, -61.1075];
  const campo1 = [
    [-36.2023, -61.1042],
    [-36.2086, -61.1112],
    [-36.2115, -61.1078],
    [-36.2054, -61.1002],
    [-36.2023, -61.1042]
  ];

  const campo2 = [
    [-36.2115, -61.1078],
    [-36.2054, -61.1002],
    [-36.2083, -61.0966],
    [-36.2143, -61.1038],
    [-36.2115, -61.1078]
  ]
  const blueOptions = { color: '#ff0000' }
  const redOptions = { color: '#0000ff' }
  const styleMap = { minHeight: "50rem", maxWidth: "60rem" }
  const fillBlueOptions= {fillColor : 'rgb(255,0,255)'}

  return (
    <div className="container">
      <div className="mb-3">
        <h3>Mapa simple de OpenStreetMap con Leaflet con Vite + ReacJS</h3>
        <a href="https://react-leaflet.js.org/" target="_blank" rel="noreferrer">Documentación React LeafLet</a>
      </div>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={styleMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          eventHandlers={{
            click: () => {
              console.log('marker clicked')
            },
          }}>
          <Popup>
            Ciba. <br /> Circulo Bolivarense de Arqueria.
          </Popup>
        </Marker>
        <Polygon pathOptions={blueOptions} positions={campo1} />
        <Polygon pathOptions={redOptions} positions={campo2} />
        <Circle center={mapsposition} pathOptions={fillBlueOptions} radius={200} />
      </MapContainer>
    </div>
  );
};

export default App;