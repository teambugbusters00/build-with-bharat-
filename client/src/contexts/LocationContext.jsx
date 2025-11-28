import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedLocation = localStorage.getItem("userLocation");
        const savedCoords = localStorage.getItem("userCoords");

        // 1. Show saved location instantly (no waiting)
        if (savedLocation && savedCoords) {
            setLocation(savedLocation);
            setCoords(JSON.parse(savedCoords));
        }

        // 2. Always fetch fresh location on page reload (F5)
        fetchLocationFromGPS();
    }, []);

    const fetchLocationFromGPS = () => {
        setLoading(true);

        if (!navigator.geolocation) {
            setLocation("Location unavailable");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                const address = await reverseGeocode(lat, lon);

                const newCoords = { lat, lon };

                // Update state
                setCoords(newCoords);
                setLocation(address);

                // Update localStorage
                localStorage.setItem("userLocation", address);
                localStorage.setItem("userCoords", JSON.stringify(newCoords));

                setLoading(false);
            },
            (err) => {
                console.error("GPS Error:", err);
                setLocation("Location unavailable");
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    };

    const reverseGeocode = async (lat, lon) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await res.json();
            return data.display_name || `${lat}, ${lon}`;
        } catch {
            return `${lat}, ${lon}`;
        }
    };

    // manual refresh option
    const refreshLocation = () => {
        fetchLocationFromGPS();
    };

    return (
        <LocationContext.Provider
            value={{
                location,
                coords,
                loading,
                refreshLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);
