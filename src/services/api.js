// src/services/api.js

const fetchNearbyPlaces = async (lat, lng) => {
    const query = `
        [out:json];
        (
          node(around:5000,${lat},${lng})[amenity=bar];
          way(around:5000,${lat},${lng})[amenity=bar];
          relation(around:5000,${lat},${lng})[amenity=bar];
        );
        out center;
    `;

    try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.elements.map(element => ({
            id: element.id,
            name: element.tags?.name || "Nombre no disponible",
            lat: element.center?.lat || element.lat,
            lng: element.center?.lon || element.lon,
            address: element.tags ? Object.entries(element.tags).filter(([key])=>["addr:street","addr:housenumber","addr:city"].includes(key)).map(([,value])=>value).join(", ") : "Dirección no disponible"
        })).filter(element => element.lat != undefined && element.lng != undefined);
    } catch (error) {
        console.error("Error fetching nearby bars:", error);
        return [];
    }
};

const searchPlaces = async (query) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=10`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.map(place => ({
            id: place.place_id,
            name: place.display_name,
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
            address: place.address ? Object.values(place.address).join(', ') : 'Dirección no disponible'
        }));
    } catch (error) {
        console.error("Error fetching places:", error);
        return [];
    }
};

export default { fetchNearbyPlaces, searchPlaces };