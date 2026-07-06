import { useEffect, useState, useCallback } from "react";
import socket from "../services/socket";

export function useSocket() {
  const [lastAlert, setLastAlert] = useState(null);
  const [lastIncident, setLastIncident] = useState(null);
  const [lastVehicle, setLastVehicle] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    socket.on("new-alert", (alert) => setLastAlert(alert));
    socket.on("new-incident", (incident) => setLastIncident(incident));
    socket.on("vehicle-detected", (vehicle) => setLastVehicle(vehicle));
    socket.on("stats-update", (s) => setStats(s));

    return () => {
      socket.off("new-alert");
      socket.off("new-incident");
      socket.off("vehicle-detected");
      socket.off("stats-update");
    };
  }, []);

  const clearLastAlert = useCallback(() => setLastAlert(null), []);
  const clearLastIncident = useCallback(() => setLastIncident(null), []);

  return { lastAlert, lastIncident, lastVehicle, stats, clearLastAlert, clearLastIncident };
}
