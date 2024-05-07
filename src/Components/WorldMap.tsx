import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import markerIcon from "../utils/marker.png";
const WorldMap = (countries: { countriesData: any }) => {
  const { countriesData } = countries;
  const customMarker = L.icon({
    iconUrl: markerIcon,
    iconSize: [20, 25],
    iconAnchor: [15, 30],
  });
  const flatCountriesData = countriesData.flat();

  return (
    <div>
      <MapContainer
        center={[20, 40]}
        zoom={2}
        bounds={[
          [-60, -180],
          [85, 180],
        ]}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "100%" }}
        className="m-auto border-blue-700"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {flatCountriesData?.map((country: any) => (
          <Marker
            icon={customMarker}
            key={`${country.country}`}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>
                  Active Cases: {country.active} <br />
                  Recovered Cases: {country.recovered} <br />
                  Deaths: {country.deaths}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;