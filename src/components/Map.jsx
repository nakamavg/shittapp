// src/components/Map.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ bars, selectedBar, userLocation }) => {
    const MapView = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            if (center) {
                map.setView(center, 15); // Centra el mapa en la ubicación del usuario con zoom 15
            }
        }, [center, map]);
        return null;
    };

    return (
        <MapContainer
            center={userLocation ? [userLocation.lat, userLocation.lng] : [51.505, -0.09]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {bars.map((bar) => (
                <Marker key={bar.id} position={[bar.lat, bar.lng]}>
                    <Popup>{bar.name}</Popup>
                    </Marker>
            ))}
            {userLocation && <MapView center={[userLocation.lat, userLocation.lng]} />}
        </MapContainer>
    );
};

export default Map;