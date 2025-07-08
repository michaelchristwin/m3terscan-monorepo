// MapComponent.tsx
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMapStore } from "../stores/mapStore";

const containerStyle = {
	width: "100%",
	height: "400px",
};

interface MapComponentProps {
	onLocationFetched: React.Dispatch<
		React.SetStateAction<{ lat: number; lng: number; dateTime: string } | null>
	>;
	center?: { lat: number; lng: number } | null;
}

const MapComponent: React.FC<MapComponentProps> = ({
	onLocationFetched,
	center,
}) => {
	const { mapCenter, setMapCenter } = useMapStore();
	const [locationFetched, setLocationFetched] = useState(false);

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "GOOGLE_MAPS_API_KEY",
	});

	useEffect(() => {
		if (!mapCenter && !locationFetched) {
			const defaultLagosCoords = {
				lat: 6.5244,
				lng: 3.3792,
			};
			setMapCenter(defaultLagosCoords);
			setLocationFetched(true);
			onLocationFetched({
				lat: defaultLagosCoords.lat,
				lng: defaultLagosCoords.lng,
				dateTime: new Date().toISOString(),
			});
		}
	}, [mapCenter, locationFetched, setMapCenter, onLocationFetched]);

	const mapCenterToUse = center || mapCenter;

	if (!isLoaded) return <p>Loading Map...</p>;
	if (!mapCenter) return <p>Setting map to default location...</p>;

	return (
		<GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
			{mapCenterToUse && <Marker position={mapCenterToUse} />}
		</GoogleMap>
	);
};

export default MapComponent;
