import { useEffect, useState } from 'react';

function LocationMap({ location }) {
    const [mapUrl, setMapUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        const encodedLocation = encodeURIComponent(location);
        setMapUrl(`https://maps.google.com/maps?q=${encodedLocation}&t=&z=11&ie=UTF8&iwloc=&output=embed`);
    }, [location]);

    const handleMapLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="map-container">
            {isLoading && (
                <div className="map-loading">
                    <div className="map-loading-spinner"></div>
                    <p>Loading map...</p>
                </div>
            )}
            <iframe
                title="Location Map"
                width="100%"
                height="250"
                style={{ 
                    border: 0,
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapUrl}
                onLoad={handleMapLoad}
            />
        </div>
    );
}

export default LocationMap; 