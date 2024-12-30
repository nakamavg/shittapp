import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import BarList from './components/BarList';
import BarModal from './components/BarModal';
import './App.css';
import { calculateDistance } from './utils';
import axios from 'axios';

function App() {
    const [userLocation, setUserLocation] = useState(null);
    const [bars, setBars] = useState([]);
    const [orderedBars, setOrderedBars] = useState([]);
    const [selectedBar, setSelectedBar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    console.log("Ubicación del usuario:", {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    setLocationError("No se pudo obtener la ubicación. Por favor, habilita la geolocalización.");
                    console.error("Error al obtener ubicación:", error);
                }
            );
        } else {
            setLocationError("Tu navegador no soporta la geolocalización.");
        }
    }, []);

    const fetchPlaces = async (userLocation) => {
        try {
            const nominatimResponse = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=bar&bounded=1&viewbox=${userLocation.lng - 0.05},${userLocation.lat - 0.05},${userLocation.lng + 0.05},${userLocation.lat + 0.05}&limit=50`
            );

            const places = nominatimResponse.data.map((place) => ({
                id: place.place_id,
                name: place.display_name,
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lon),
                address: place.address ? place.address.freeformAddress : null,
                type: place.type,
                category: place.class,
            }));
            console.log("Bares cercanos:", places);
            return places;
        } catch (error) {
            console.error("Error fetching places:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchAndSetPlaces = async () => {
            if (userLocation) {
                setIsLoading(true);
                const data = await fetchPlaces(userLocation);
                setBars(data);
                setIsLoading(false);
            }
        };
        fetchAndSetPlaces();
    }, [userLocation]);

    useEffect(() => {
        if (userLocation && bars.length > 0) {
            const ordered = bars.map((bar) => ({
                ...bar,
                distance: calculateDistance(userLocation, { lat: bar.lat, lng: bar.lng }),
            })).sort((a, b) => a.distance - b.distance);
            setOrderedBars(ordered);
        }
    }, [userLocation, bars]);

    const handleBarClick = (bar) => {
        setSelectedBar(bar);
    };

    const handleCloseModal = () => {
        setSelectedBar(null);
    };
    return (
      <div className="app">
          {locationError && <p className="error">{locationError}</p>}
          <div className="map-container">
              <Map userLocation={userLocation} bars={orderedBars} onBarClick={handleBarClick} />
          </div>
          <div className="bar-list-container">
              <BarList bars={orderedBars} onBarClick={handleBarClick} isLoading={isLoading} />
          </div>
          {selectedBar && <BarModal bar={selectedBar} onClose={handleCloseModal} />}
      </div>
  );
}

export default App;