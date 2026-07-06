import { Link } from "react-router-dom";
import { AlertTriangle, MapPin, Clock, Shield, ChevronRight, Phone } from "lucide-react";

export default function MobileHome() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-600 text-white px-5 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Shield size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Smart Street</h1>
            <p className="text-xs text-blue-200">Securite participative</p>
          </div>
        </div>
        <p className="text-sm text-blue-100">Rue Prof. Kone Tiemoman, Abobo</p>
      </div>

      <div className="px-5 -mt-4">
        <Link
          to="/mobile/signaler"
          className="block bg-white rounded-2xl p-5 shadow-lg border border-slate-100 mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Signaler un incident</p>
                <p className="text-xs text-slate-500 mt-0.5">Photo, position GPS, description</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </div>
        </Link>

        <Link
          to="/mobile/mes-signalements"
          className="block bg-white rounded-2xl p-5 shadow-lg border border-slate-100 mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Clock size={24} className="text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Mes signalements</p>
                <p className="text-xs text-slate-500 mt-0.5">Suivre l'etat de vos signalements</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </div>
        </Link>

        <Link
          to="/mobile/carte"
          className="block bg-white rounded-2xl p-5 shadow-lg border border-slate-100 mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <MapPin size={24} className="text-emerald-500" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Carte de securite</p>
                <p className="text-xs text-slate-500 mt-0.5">Cameras et incidents en temps reel</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </div>
        </Link>

        <a
          href="tel:110"
          className="block bg-white rounded-2xl p-5 shadow-lg border border-red-100 mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <Phone size={24} className="text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-red-700">Appel d'urgence</p>
                <p className="text-xs text-slate-500 mt-0.5">Police / Pompiers / SAMU</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-red-400" />
          </div>
        </a>
      </div>

      <div className="px-5 mt-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs text-blue-800 font-medium mb-1">Conseil securite</p>
          <p className="text-xs text-blue-600">En cas d'urgence, appelez d'abord le 110. Utilisez l'application pour signaler les situations non urgentes.</p>
        </div>
      </div>

      <div className="px-5 py-6 text-center">
        <p className="text-[10px] text-slate-400">Smart Street Security v1.0 - Projet PCT RSI 2026</p>
      </div>
    </div>
  );
}
