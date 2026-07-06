export const cameras = [
  { id: 1, name: "CAM-01 Entree Est D 225", ip: "10.0.10.2", lat: 5.42215, lng: -4.01685, orientation: 360, status: "online", lastSeen: "2026-06-24T10:32:00Z", zone: "Zone A", type: "PTZ" },
  { id: 2, name: "CAM-02 Groupe Scolaire N'TANOUAN", ip: "10.0.10.3", lat: 5.42198, lng: -4.01815, orientation: 90, status: "online", lastSeen: "2026-06-24T10:31:00Z", zone: "Zone A", type: "PTZ" },
  { id: 3, name: "CAM-03 College El Itratou", ip: "10.0.10.4", lat: 5.42180, lng: -4.01945, orientation: 180, status: "online", lastSeen: "2026-06-24T10:30:00Z", zone: "Zone B", type: "PTZ" },
  { id: 4, name: "CAM-04 Pharmacie EMS Sante", ip: "10.0.10.5", lat: 5.42163, lng: -4.02075, orientation: 270, status: "online", lastSeen: "2026-06-24T10:29:00Z", zone: "Zone B", type: "PTZ" },
  { id: 5, name: "CAM-05 Rue Rose Virginie Aka", ip: "10.0.10.6", lat: 5.42145, lng: -4.02205, orientation: 360, status: "online", lastSeen: "2026-06-24T10:32:00Z", zone: "Zone B", type: "PTZ" },
  { id: 6, name: "CAM-06 Sortie Ouest Q 125", ip: "10.0.10.7", lat: 5.42128, lng: -4.02335, orientation: 120, status: "online", lastSeen: "2026-06-24T10:31:00Z", zone: "Zone C", type: "PTZ" },
];

export const aiEvents = [
  { id: 1, type: "Accident", cameraId: 1, cameraName: "CAM-01", confidence: 0.94, timestamp: "2026-06-24T10:28:00Z", status: "new", thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&q=80" },
  { id: 2, type: "Vol", cameraId: 4, cameraName: "CAM-04", confidence: 0.87, timestamp: "2026-06-24T10:15:00Z", status: "acknowledged", thumbnail: "https://images.unsplash.com/photo-1568444462690-46c5b556a98d?w=300&q=80" },
  { id: 3, type: "Bagarre", cameraId: 3, cameraName: "CAM-03", confidence: 0.91, timestamp: "2026-06-24T09:52:00Z", status: "incident_created", thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&q=80" },
  { id: 4, type: "Intrusion", cameraId: 6, cameraName: "CAM-06", confidence: 0.92, timestamp: "2026-06-24T09:40:00Z", status: "new", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&q=80" },
  { id: 5, type: "Incendie", cameraId: 1, cameraName: "CAM-01", confidence: 0.97, timestamp: "2026-06-24T09:30:00Z", status: "acknowledged", thumbnail: "https://images.unsplash.com/photo-1532771098148-26d2874e0c02?w=300&q=80" },
  { id: 6, type: "Accident", cameraId: 5, cameraName: "CAM-05", confidence: 0.89, timestamp: "2026-06-24T09:18:00Z", status: "ignored", thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&q=80" },
  { id: 7, type: "Vol", cameraId: 4, cameraName: "CAM-04", confidence: 0.93, timestamp: "2026-06-24T09:05:00Z", status: "incident_created", thumbnail: "https://images.unsplash.com/photo-1568444462690-46c5b556a98d?w=300&q=80" },
  { id: 8, type: "Bagarre", cameraId: 2, cameraName: "CAM-02", confidence: 0.78, timestamp: "2026-06-24T08:50:00Z", status: "new", thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&q=80" },
  { id: 9, type: "Intrusion", cameraId: 6, cameraName: "CAM-06", confidence: 0.86, timestamp: "2026-06-24T08:35:00Z", status: "acknowledged", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&q=80" },
  { id: 10, type: "Incendie", cameraId: 3, cameraName: "CAM-03", confidence: 0.98, timestamp: "2026-06-24T08:22:00Z", status: "incident_created", thumbnail: "https://images.unsplash.com/photo-1532771098148-26d2874e0c02?w=300&q=80" },
  { id: 11, type: "Accident", cameraId: 5, cameraName: "CAM-05", confidence: 0.85, timestamp: "2026-06-24T08:10:00Z", status: "new", thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&q=80" },
  { id: 12, type: "Vol", cameraId: 6, cameraName: "CAM-06", confidence: 0.91, timestamp: "2026-06-24T07:55:00Z", status: "acknowledged", thumbnail: "https://images.unsplash.com/photo-1568444462690-46c5b556a98d?w=300&q=80" },
];

export const incidents = [
  {
    id: 1,
    title: "Accident de circulation - Carrefour Abobo Baoule",
    type: "Accident",
    severity: "high",
    status: "open",
    location: "Rue Prof. Kone Tiemoman, Carrefour Abobo Baoule",
    assignee: "Sgt. Kouame Yao",
    createdAt: "2026-06-24T10:28:00Z",
    updatedAt: "2026-06-24T10:30:00Z",
    description: "Collision entre un gbaka et un taxi compteur. Deux blesses legers signales. Circulation perturbee sur 200m.",
  },
  {
    id: 2,
    title: "Tentative de vol - Marche d'Abobo",
    type: "Vol",
    severity: "medium",
    status: "assigned",
    location: "Rue Prof. Kone Tiemoman, pres du Marche",
    assignee: "Cpl. Traore Aminata",
    createdAt: "2026-06-24T10:15:00Z",
    updatedAt: "2026-06-24T10:20:00Z",
    description: "Individu suspect repere par l'IA tentant de derober un telephone portable a un passant.",
  },
  {
    id: 3,
    title: "Rixe devant le maquis Le Palmier",
    type: "Bagarre",
    severity: "high",
    status: "in_progress",
    location: "Rue Prof. Kone Tiemoman, secteur Le Palmier",
    assignee: "Lt. Diallo Moussa",
    createdAt: "2026-06-24T09:52:00Z",
    updatedAt: "2026-06-24T10:05:00Z",
    description: "Altercation entre 4 individus. Une patrouille a ete depeche sur les lieux.",
  },
  {
    id: 4,
    title: "Intrusion zone securisee - Depot municipal",
    type: "Intrusion",
    severity: "critical",
    status: "in_progress",
    location: "Depot municipal, Rue Prof. Kone Tiemoman",
    assignee: "Sgt. Kouame Yao",
    createdAt: "2026-06-24T08:50:00Z",
    updatedAt: "2026-06-24T09:15:00Z",
    description: "Detection d'une intrusion dans le perimetre securise du depot municipal. Forces de securite en intervention.",
  },
  {
    id: 5,
    title: "Depart de feu - Atelier menuiserie",
    type: "Incendie",
    severity: "critical",
    status: "assigned",
    location: "Atelier Bois d'Ebene, Rue Prof. Kone Tiemoman",
    assignee: "Lt. Diallo Moussa",
    createdAt: "2026-06-24T08:35:00Z",
    updatedAt: "2026-06-24T08:40:00Z",
    description: "Fumee detectee par camera IA. Pompiers alertes. Risque de propagation aux habitations voisines.",
  },
  {
    id: 6,
    title: "Stationnement abusif - Voie principale",
    type: "Stationnement interdit",
    severity: "low",
    status: "closed",
    location: "Rue Prof. Kone Tiemoman, devant la pharmacie",
    assignee: "Cpl. Traore Aminata",
    createdAt: "2026-06-24T06:42:00Z",
    updatedAt: "2026-06-24T07:30:00Z",
    description: "Vehicule en stationnement genant la circulation. Proprietaire contacte, vehicule deplace.",
  },
];

export const plates = [
  { id: 1, plate: "CI-1234-AB", cameraName: "CAM-ABO-001", timestamp: "2026-06-24T10:30:00Z", vehicleType: "Berline", flagged: false, flagReason: null },
  { id: 2, plate: "CI-5678-CD", cameraName: "CAM-ABO-003", timestamp: "2026-06-24T10:28:00Z", vehicleType: "SUV", flagged: true, flagReason: "Vehicule signale vole" },
  { id: 3, plate: "CI-9012-EF", cameraName: "CAM-ABO-004", timestamp: "2026-06-24T10:25:00Z", vehicleType: "Gbaka", flagged: false, flagReason: null },
  { id: 4, plate: "CI-3456-GH", cameraName: "CAM-ABO-006", timestamp: "2026-06-24T10:20:00Z", vehicleType: "Taxi", flagged: false, flagReason: null },
  { id: 5, plate: "CI-7890-IJ", cameraName: "CAM-ABO-007", timestamp: "2026-06-24T10:18:00Z", vehicleType: "Camionnette", flagged: true, flagReason: "Controle technique expire" },
  { id: 6, plate: "CI-2345-KL", cameraName: "CAM-ABO-008", timestamp: "2026-06-24T10:15:00Z", vehicleType: "Moto", flagged: false, flagReason: null },
  { id: 7, plate: "CI-6789-MN", cameraName: "CAM-ABO-010", timestamp: "2026-06-24T10:10:00Z", vehicleType: "Berline", flagged: false, flagReason: null },
  { id: 8, plate: "CI-0123-OP", cameraName: "CAM-ABO-012", timestamp: "2026-06-24T10:05:00Z", vehicleType: "Woro-woro", flagged: false, flagReason: null },
  { id: 9, plate: "CI-4567-QR", cameraName: "CAM-ABO-013", timestamp: "2026-06-24T09:58:00Z", vehicleType: "SUV", flagged: true, flagReason: "Proprietaire recherche" },
  { id: 10, plate: "CI-8901-ST", cameraName: "CAM-ABO-014", timestamp: "2026-06-24T09:50:00Z", vehicleType: "Camion", flagged: false, flagReason: null },
  { id: 11, plate: "CI-2346-UV", cameraName: "CAM-ABO-002", timestamp: "2026-06-24T09:45:00Z", vehicleType: "Berline", flagged: false, flagReason: null },
  { id: 12, plate: "CI-6780-WX", cameraName: "CAM-ABO-009", timestamp: "2026-06-24T09:40:00Z", vehicleType: "Taxi", flagged: false, flagReason: null },
  { id: 13, plate: "CI-1357-YZ", cameraName: "CAM-ABO-001", timestamp: "2026-06-24T09:35:00Z", vehicleType: "Gbaka", flagged: false, flagReason: null },
  { id: 14, plate: "CI-2468-AA", cameraName: "CAM-ABO-004", timestamp: "2026-06-24T09:30:00Z", vehicleType: "Moto", flagged: false, flagReason: null },
  { id: 15, plate: "CI-3579-BB", cameraName: "CAM-ABO-006", timestamp: "2026-06-24T09:25:00Z", vehicleType: "SUV", flagged: false, flagReason: null },
  { id: 16, plate: "CI-4680-CC", cameraName: "CAM-ABO-011", timestamp: "2026-06-24T09:20:00Z", vehicleType: "Berline", flagged: false, flagReason: null },
];

export const citizenReports = [
  {
    id: 1,
    citizen: "Koffi Adjoua Marie",
    phone: "+225 07 08 12 34 56",
    description: "Un groupe de jeunes bloque la route et rackette les passants pres du pont.",
    category: "Insecurite",
    lat: 5.3479,
    lng: -3.9990,
    address: "Rue Prof. Kone Tiemoman, pres du pont d'Abobo",
    createdAt: "2026-06-24T09:45:00Z",
    status: "new",
    photo: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=300",
  },
  {
    id: 2,
    citizen: "Toure Ibrahim",
    phone: "+225 05 06 78 90 12",
    description: "Fuite d'eau importante qui inonde la chaussee depuis ce matin. Danger pour les vehicules.",
    category: "Infrastructure",
    lat: 5.3485,
    lng: -3.9977,
    address: "Rue Prof. Kone Tiemoman, face a la station Total",
    createdAt: "2026-06-24T08:30:00Z",
    status: "processing",
    photo: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=300",
  },
  {
    id: 3,
    citizen: "Coulibaly Fatoumata",
    phone: "+225 01 02 34 56 78",
    description: "Vehicule suspect stationne depuis 3 jours sans plaque d'immatriculation.",
    category: "Vehicule suspect",
    lat: 5.3492,
    lng: -3.9970,
    address: "Rue Prof. Kone Tiemoman, quartier Habitat",
    createdAt: "2026-06-24T07:15:00Z",
    status: "transferred",
    photo: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=300",
  },
  {
    id: 4,
    citizen: "Bamba Sekou",
    phone: "+225 07 09 11 22 33",
    description: "Les lampadaires sont eteints depuis une semaine. Zone tres sombre la nuit.",
    category: "Eclairage public",
    lat: 5.3470,
    lng: -3.9996,
    address: "Rue Prof. Kone Tiemoman, secteur Sogefiha",
    createdAt: "2026-06-23T18:00:00Z",
    status: "processing",
    photo: null,
  },
  {
    id: 5,
    citizen: "Yao N'Guessan Aimee",
    phone: "+225 05 04 55 66 77",
    description: "Bagarre ce matin devant l'ecole. Des eleves blesses. Besoin de securisation.",
    category: "Violence",
    lat: 5.3488,
    lng: -3.9983,
    address: "Rue Prof. Kone Tiemoman, devant le Groupe Scolaire",
    createdAt: "2026-06-24T07:45:00Z",
    status: "closed",
    photo: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300",
  },
];

export const users = [
  { id: 1, name: "Mariam Toure", email: "m.toure@smartstreet.ci", role: "Administrateur", status: "active", lastLogin: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: 2, name: "Jean-Paul Kacou", email: "jp.kacou@smartstreet.ci", role: "Responsable securite", status: "active", lastLogin: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: 3, name: "Awa Bamba", email: "a.bamba@smartstreet.ci", role: "Operateur", status: "active", lastLogin: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 4, name: "Serge Yao", email: "s.yao@smartstreet.ci", role: "Operateur", status: "active", lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 5, name: "Nadia Ouattara", email: "n.ouattara@smartstreet.ci", role: "Operateur", status: "inactive", lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
];

export const loginHistory = [
  { id: 1, user: "Mariam Toure", ip: "196.45.123.10", date: new Date(Date.now() - 1000 * 60 * 12).toISOString(), result: "Succes" },
  { id: 2, user: "Awa Bamba", ip: "196.78.201.44", date: new Date(Date.now() - 1000 * 60 * 47).toISOString(), result: "Succes" },
  { id: 3, user: "Jean-Paul Kacou", ip: "196.112.89.77", date: new Date(Date.now() - 1000 * 60 * 94).toISOString(), result: "Succes" },
  { id: 4, user: "Serge Yao", ip: "196.34.156.22", date: new Date(Date.now() - 1000 * 60 * 141).toISOString(), result: "Echec" },
  { id: 5, user: "Serge Yao", ip: "196.34.156.22", date: new Date(Date.now() - 1000 * 60 * 188).toISOString(), result: "Succes" },
  { id: 6, user: "Mariam Toure", ip: "196.45.123.10", date: new Date(Date.now() - 1000 * 60 * 235).toISOString(), result: "Succes" },
  { id: 7, user: "Awa Bamba", ip: "196.78.201.44", date: new Date(Date.now() - 1000 * 60 * 282).toISOString(), result: "Succes" },
  { id: 8, user: "Jean-Paul Kacou", ip: "196.112.89.77", date: new Date(Date.now() - 1000 * 60 * 329).toISOString(), result: "Succes" },
];

export const zones = [
  { id: 1, name: "Zone A", cameras: 2, sensitivity: "high", color: "#2563EB" },
  { id: 2, name: "Zone B", cameras: 3, sensitivity: "medium", color: "#10B981" },
  { id: 3, name: "Zone C", cameras: 1, sensitivity: "high", color: "#F59E0B" },
];

export const stats = {
  totalCameras: cameras.length,
  onlineCameras: cameras.filter(c => c.status === "online").length,
  offlineCameras: cameras.filter(c => c.status === "offline").length,
  alertCameras: cameras.filter(c => c.status === "alert").length,
  totalIncidents: incidents.length,
  openIncidents: incidents.filter(i => i.status === "open" || i.status === "assigned" || i.status === "in_progress").length,
  closedIncidents: incidents.filter(i => i.status === "closed").length,
  criticalIncidents: incidents.filter(i => i.severity === "critical").length,
  totalEvents: aiEvents.length,
  totalPlates: plates.length,
  flaggedPlates: plates.filter(p => p.flagged).length,
};

export const weeklyTrends = [
  { day: "Lun", incidents: 4, ai: 12, plates: 145 },
  { day: "Mar", incidents: 6, ai: 18, plates: 152 },
  { day: "Mer", incidents: 3, ai: 9, plates: 138 },
  { day: "Jeu", incidents: 7, ai: 22, plates: 161 },
  { day: "Ven", incidents: 5, ai: 15, plates: 149 },
  { day: "Sam", incidents: 8, ai: 25, plates: 155 },
  { day: "Dim", incidents: 2, ai: 7, plates: 90 },
];

export const incidentBreakdown = [
  { name: "Accident", value: 35 },
  { name: "Vol", value: 25 },
  { name: "Bagarre", value: 18 },
  { name: "Intrusion", value: 12 },
  { name: "Incendie", value: 10 },
];

export const cyberServices = [
  { name: "Serveur Principal", status: "online", uptime: 99.97, load: 42 },
  { name: "Base de Donnees", status: "online", uptime: 99.95, load: 58 },
  { name: "Stockage Video", status: "online", uptime: 99.90, load: 73 },
  { name: "Module IA", status: "online", uptime: 99.88, load: 67 },
  { name: "API Gateway", status: "online", uptime: 99.99, load: 31 },
  { name: "Service Alertes", status: "online", uptime: 99.92, load: 22 },
  { name: "Backup Serveur", status: "degraded", uptime: 98.50, load: 85 },
  { name: "VPN Securise", status: "online", uptime: 99.96, load: 15 },
];

export const wantedPlates = [
  { plate: "CI-5678-CD", reason: "Vehicule signale vole - Commissariat Abobo", since: "2026-06-20" },
  { plate: "CI-4567-QR", reason: "Proprietaire recherche pour delit de fuite", since: "2026-06-22" },
  { plate: "CI-9999-ZZ", reason: "Vehicule utilise lors d'un braquage", since: "2026-06-18" },
];

export function timeAgo(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMs / 3600000);
  const diffJ = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "a l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  if (diffH < 24) return `il y a ${diffH} h`;
  return `il y a ${diffJ} j`;
}
