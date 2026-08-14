import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function RiskMap({ fields, fires, onSelectField }) {
  // Center around Coimbatore region (11.016, 76.955 from Navithanjali's output)
  const defaultCenter = [11.0168, 76.9558];

  const getFieldStyle = (field) => {
    const score = field.risk_score || 0;
    let color = "#4caf50"; // Low Risk
    if (score > 70) color = "#f44336"; // High Risk
    else if (score > 40) color = "#ff9800"; // Medium Risk

    return {
      fillColor: color,
      weight: 2,
      opacity: 1,
      color: "#ffffff",
      fillOpacity: 0.6,
    };
  };

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "8px", overflow: "hidden" }}>
      <MapContainer center={defaultCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render polygons directly from Navithanjali's real field data */}
        {fields && fields.map((field) => field.geometry && (
          <GeoJSON
            key={field.id}
            data={field.geometry}
            style={() => getFieldStyle(field)}
            eventHandlers={{
              click: () => onSelectField && onSelectField(field),
            }}
          >
            <Popup>
              <strong>{field.id}: {field.name}</strong><br />
              Farmer: {field.farmer_name}<br />
              Risk Score: <strong>{field.risk_score}%</strong>
            </Popup>
          </GeoJSON>
        ))}

        {/* Render live NASA FIRMS active fires from /api/fires */}
        {fires && fires.map((fire, idx) => (
          <Marker key={idx} position={[fire.lat, fire.lon]}>
            <Popup>
              <strong>🔥 NASA FIRMS Fire Detected!</strong><br />
              Field: {fire.field_id}<br />
              Confidence: {(fire.confidence * 100).toFixed(0)}%<br />
              Brightness: {fire.brightness_kelvin} K
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}