import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
	const [bounds, setBounds] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [map, setMap] = useState(null);

	const { isLoaded } = useJsApiLoader({
		id: "google-map",
		googleMapsApiKey: "A"
	});

	const onLoad = map => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
			const pos = { lat, lng };
			setCurrentLocation(pos);
		});
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	};

	const SBonLoad = ref => (this.searchBox = ref);

	const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

	return isLoaded ? (
		<div className="text-center mt-5">
			<GoogleMap
				onLoad={map => onLoad(map)}
				zoom={10}
				center={currentLocation}
				mapContainerStyle={{ height: "400px", width: "800px" }}>
				<InfoWindow position={currentLocation}>
					<div>
						<h1>Infoooo</h1>
					</div>
				</InfoWindow>
				<Marker label="Mi posición" position={currentLocation} />
			</GoogleMap>
		</div>
	) : (
		<></>
	);
};
