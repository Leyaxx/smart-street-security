import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Circle as LeafletCircle } from "react-leaflet";
import api from "../../services/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const cameraIcon = new L.DivIcon({
  html: `<div style="background:#2563EB;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.3)"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const incidentIcon = new L.DivIcon({
  html: `<div style="background:#EF4444;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.3)"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>`,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function MobileCarte() {
  const navigate = useNavigate();
  const [cameras, setCameras] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get("/cameras").then((r) => setCameras(r.data));
    api.get("/incidents").then((r) => setIncidents(r.data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b border-slate-200 px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/mobile")} className="p-2 -ml-2 cursor-pointer">
          <ArrowLeft size={20} className="text-slate-700" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Carte de securite</h1>
      </div>

      <div className="flex-1">
        <MapContainer
          center={[5.4215, -4.0187]}
          zoom={16}
          style={{ height: "calc(100vh - 80px)", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap"
          />
          {cameras.map((cam) => (
            <Marker key={`cam-${cam.id}`} position={[cam.lat, cam.lng]} icon={cameraIcon}>
              <Popup>
                <div className="text-xs">
                  <p className="font-medium">{cam.name}</p>
                  <p className="text-slate-500">{cam.zone}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          {cameras.map((cam) => (
            <LeafletCircle
              key={`r-${cam.id}`}
              center={[cam.lat, cam.lng]}
              radius={30}
              pathOptions={{ color: "#2563EB", fillColor: "#2563EB", fillOpacity: 0.06, weight: 1 }}
            />
          ))}
          {incidents.filter((i) => i.status !== "resolu").map((inc) => (
            <Marker key={`inc-${inc.id}`} position={[inc.lat, inc.lng]} icon={incidentIcon}>
              <Popup>
                <div className="text-xs">
                  <p className="font-medium capitalize">{inc.type}</p>
                  <p className="text-slate-500">{inc.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="bg-white border-t border-slate-200 px-5 py-3 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span>
          <span className="text-slate-600">Cameras</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-slate-600">Incidents</span>
        </div>
      </div>
    </div>
  );
}
