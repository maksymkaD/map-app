import './App.css';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import { useEffect } from 'react';
import L from 'leaflet';

const Routing = ({ points }) => {
    const map = useMap();

    useEffect(() => {
        if (points.length < 2) return;

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
            if (!map || !routingControl) return;
            return map.removeControl(routingControl)
        };
    }, [map, points]);

    return null;
};

export default Routing;