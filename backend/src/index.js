const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { cameras, incidents, alerts, vehicles, stats, signalements } = require("./data");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

let incidentsList = [...incidents];
let alertsList = [...alerts];
let vehiclesList = [...vehicles];
let signalementsList = [...signalements];
let currentStats = { ...stats };

app.get("/api/cameras", (req, res) => res.json(cameras));
app.get("/api/incidents", (req, res) => res.json(incidentsList));
app.get("/api/alerts", (req, res) => res.json(alertsList));
app.get("/api/vehicles", (req, res) => res.json(vehiclesList));
app.get("/api/stats", (req, res) => res.json(currentStats));
app.get("/api/signalements", (req, res) => res.json(signalementsList));

app.post("/api/signalements", (req, res) => {
  const { description, category, lat, lng, citizenName, citizenPhone } = req.body;
  const signalement = {
    id: signalementsList.length + 1,
    description,
    category: category || "autre",
    lat: lat || 5.4215,
    lng: lng || -4.0187,
    photo: null,
    citizenName: citizenName || "Anonyme",
    citizenPhone: citizenPhone || null,
    status: "nouveau",
    createdAt: new Date().toISOString(),
  };
  signalementsList.unshift(signalement);
  io.emit("new-signalement", signalement);
  res.status(201).json(signalement);
});

app.patch("/api/signalements/:id/status", (req, res) => {
  const { status } = req.body;
  const signalement = signalementsList.find((s) => s.id === parseInt(req.params.id));
  if (!signalement) return res.status(404).json({ error: "Signalement non trouve" });
  signalement.status = status;
  res.json(signalement);
});

app.post("/api/incidents", (req, res) => {
  const { type, description, lat, lng, cameraId, reportedBy } = req.body;
  const incident = {
    id: incidentsList.length + 1,
    type,
    description,
    lat,
    lng,
    cameraId,
    status: "nouveau",
    reportedBy: reportedBy || "Citoyen",
    createdAt: new Date().toISOString(),
  };
  incidentsList.unshift(incident);
  currentStats.incidentsActifs++;
  currentStats.incidentsTotal++;
  io.emit("new-incident", incident);
  io.emit("stats-update", currentStats);
  res.status(201).json(incident);
});

app.post("/api/alerts", (req, res) => {
  const { type, message, severity, cameraId } = req.body;
  const alert = {
    id: alertsList.length + 1,
    type,
    message,
    severity,
    cameraId,
    acknowledged: false,
    createdAt: new Date().toISOString(),
  };
  alertsList.unshift(alert);
  currentStats.alertesNonLues++;
  currentStats.alertesTotal++;
  io.emit("new-alert", alert);
  io.emit("stats-update", currentStats);
  res.status(201).json(alert);
});

app.post("/api/vehicles/detect", (req, res) => {
  const { plate, cameraId, flagged, reason } = req.body;
  const camera = cameras.find((c) => c.id === cameraId);
  const vehicle = {
    id: vehiclesList.length + 1,
    plate,
    lastCamera: camera ? camera.name : "Inconnu",
    lastSeen: new Date().toISOString(),
    flagged: flagged || false,
    reason: reason || null,
  };
  vehiclesList.unshift(vehicle);
  currentStats.vehiculesDetectes++;
  if (flagged) currentStats.vehiculesSignales++;
  io.emit("vehicle-detected", vehicle);
  io.emit("stats-update", currentStats);
  res.status(201).json(vehicle);
});

app.patch("/api/incidents/:id/status", (req, res) => {
  const { status } = req.body;
  const incident = incidentsList.find((i) => i.id === parseInt(req.params.id));
  if (!incident) return res.status(404).json({ error: "Incident non trouve" });
  incident.status = status;
  if (status === "resolu") currentStats.incidentsActifs--;
  io.emit("incident-updated", incident);
  io.emit("stats-update", currentStats);
  res.json(incident);
});

app.patch("/api/alerts/:id/acknowledge", (req, res) => {
  const alert = alertsList.find((a) => a.id === parseInt(req.params.id));
  if (!alert) return res.status(404).json({ error: "Alerte non trouvee" });
  alert.acknowledged = true;
  currentStats.alertesNonLues--;
  io.emit("stats-update", currentStats);
  res.json(alert);
});

io.on("connection", (socket) => {
  console.log("Client connecte:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client deconnecte:", socket.id);
  });
});

app.use((req, res) => {
  const indexPath = path.join(publicPath, "index.html");
  const fs = require("fs");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Frontend not built");
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Smart Street API sur http://localhost:${PORT}`);
});
