import { useEffect, useState } from 'react';

function LocationMap({ location }) {
    const [mapUrl, setMapUrl] = useState('');
    
    useEffect(() => {
        // Convert location to URL-friendly format
        const encodedLocation = encodeURIComponent(location);
        setMapUrl(`https://maps.google.com/maps?q=${encodedLocation}&t=&z=11&ie=UTF8&iwloc=&output=embed`);
    }, [location]);

    return (
        <div className="map-container">
            <iframe
                title="Location Map"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapUrl}
            />
        </div>
    );
}

export default LocationMap; 