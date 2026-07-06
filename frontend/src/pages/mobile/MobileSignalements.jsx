import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, CheckCircle, AlertTriangle, Loader } from "lucide-react";
import api from "../../services/api";

const statusConfig = {
  nouveau: { label: "En attente", icon: Clock, color: "text-blue-600 bg-blue-50" },
  en_cours: { label: "En cours", icon: Loader, color: "text-amber-600 bg-amber-50" },
  traite: { label: "Traite", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
  cloture: { label: "Cloture", icon: CheckCircle, color: "text-slate-500 bg-slate-100" },
};

export default function MobileSignalements() {
  const navigate = useNavigate();
  const [signalements, setSignalements] = useState([]);

  useEffect(() => {
    api.get("/signalements").then((r) => setSignalements(r.data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/mobile")} className="p-2 -ml-2 cursor-pointer">
          <ArrowLeft size={20} className="text-slate-700" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Mes signalements</h1>
      </div>

      <div className="p-5 space-y-3">
        {signalements.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle size={32} className="text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Aucun signalement</p>
          </div>
        ) : (
          signalements.map((sig) => {
            const status = statusConfig[sig.status] || statusConfig.nouveau;
            const StatusIcon = status.icon;
            return (
              <div key={sig.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-slate-900 flex-1 pr-3">{sig.description}</p>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
                    <StatusIcon size={12} />
                    {status.label}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(sig.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {sig.lat.toFixed(3)}, {sig.lng.toFixed(3)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
