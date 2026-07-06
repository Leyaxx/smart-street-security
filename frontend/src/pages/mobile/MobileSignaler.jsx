import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, Send, CheckCircle } from "lucide-react";
import api from "../../services/api";

const categories = [
  { key: "securite", label: "Securite" },
  { key: "voirie", label: "Voirie" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "urgence", label: "Urgence" },
  { key: "autre", label: "Autre" },
];

export default function MobileSignaler() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: "",
    category: "securite",
    citizenName: "",
    citizenPhone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gps, setGps] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setGps({ lat: 5.4215, lng: -4.0187 })
      );
    } else {
      setGps({ lat: 5.4215, lng: -4.0187 });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const location = gps || { lat: 5.4215, lng: -4.0187 };
    await api.post("/signalements", {
      ...form,
      lat: location.lat,
      lng: location.lng,
    });
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Signalement envoye</h2>
          <p className="text-sm text-slate-500 mb-6">Votre signalement a ete transmis aux autorites. Vous serez notifie de son avancement.</p>
          <button
            onClick={() => navigate("/mobile")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm cursor-pointer"
          >
            Retour a l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/mobile")} className="p-2 -ml-2 cursor-pointer">
          <ArrowLeft size={20} className="text-slate-700" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Signaler un incident</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Categorie</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setForm({ ...form, category: cat.key })}
                className={`text-xs px-3 py-2 rounded-lg border font-medium transition-colors cursor-pointer ${
                  form.category === cat.key
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Decrivez la situation..."
            rows={4}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Photo (optionnel)</label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-white">
            <Camera size={24} className="text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">Appuyez pour prendre une photo</p>
            <input type="file" accept="image/*" capture="environment" className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Position GPS</label>
          <button
            type="button"
            onClick={getLocation}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <MapPin size={18} className={gps ? "text-emerald-500" : "text-slate-400"} />
            {gps ? (
              <span className="text-emerald-700 font-medium">Position obtenue ({gps.lat.toFixed(4)}, {gps.lng.toFixed(4)})</span>
            ) : (
              <span className="text-slate-500">Activer la geolocalisation</span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Votre nom</label>
            <input
              type="text"
              value={form.citizenName}
              onChange={(e) => setForm({ ...form, citizenName: e.target.value })}
              placeholder="Nom complet"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Telephone</label>
            <input
              type="tel"
              value={form.citizenPhone}
              onChange={(e) => setForm({ ...form, citizenPhone: e.target.value })}
              placeholder="07-XX-XX-XX"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          <Send size={16} />
          {loading ? "Envoi en cours..." : "Envoyer le signalement"}
        </button>
      </form>
    </div>
  );
}
