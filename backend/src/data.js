const cameras = [
  { id: 1, name: "CAM-01 Entree Est D 225", ip: "10.0.10.2", lat: 5.42215, lng: -4.01685, zone: "Intersection D 225", vlan: 10, status: "active", fps: 25, resolution: "1920x1080" },
  { id: 2, name: "CAM-02 Groupe Scolaire N'TANOUAN", ip: "10.0.10.3", lat: 5.42198, lng: -4.01815, zone: "Groupe Scolaire", vlan: 10, status: "active", fps: 25, resolution: "1920x1080" },
  { id: 3, name: "CAM-03 College El Itratou", ip: "10.0.10.4", lat: 5.42180, lng: -4.01945, zone: "College El Itratou", vlan: 10, status: "active", fps: 25, resolution: "1920x1080" },
  { id: 4, name: "CAM-04 Pharmacie EMS Sante", ip: "10.0.10.5", lat: 5.42163, lng: -4.02075, zone: "Pharmacie EMS Sante", vlan: 10, status: "active", fps: 25, resolution: "1920x1080" },
  { id: 5, name: "CAM-05 Rue Rose Virginie Aka", ip: "10.0.10.6", lat: 5.42145, lng: -4.02205, zone: "Intersection", vlan: 10, status: "active", fps: 25, resolution: "1920x1080" },
  { id: 6, name: "CAM-06 Sortie Ouest Q 125", ip: "10.0.10.7", lat: 5.42128, lng: -4.02335, zone: "Sortie Ouest", vlan: 10, status: "active", fps: 25, resolution: "1920x1080" },
];

const incidents = [
  { id: 1, type: "vol", description: "Vol de telephone signale pres de la zone commerciale", lat: 5.4222, lng: -4.0194, status: "nouveau", cameraId: 2, reportedBy: "Amadou Diallo", createdAt: "2026-06-18T14:23:00" },
  { id: 2, type: "accident", description: "Collision moto-voiture au carrefour nord", lat: 5.4225, lng: -4.0197, status: "en_cours", cameraId: 1, reportedBy: "Fatou Coulibaly", createdAt: "2026-06-18T15:10:00" },
  { id: 3, type: "intrusion", description: "Personne suspecte detectee pres de l'ecole apres les heures", lat: 5.4216, lng: -4.0188, status: "resolu", cameraId: 4, reportedBy: "Systeme IA", createdAt: "2026-06-17T22:45:00" },
  { id: 4, type: "incendie", description: "Fumee detectee pres de la sortie ouest", lat: 5.42128, lng: -4.02335, status: "en_cours", cameraId: 6, reportedBy: "Systeme IA", createdAt: "2026-06-18T16:02:00" },
  { id: 5, type: "vol", description: "Tentative de vol a l'arrachee", lat: 5.4210, lng: -4.0182, status: "nouveau", cameraId: 6, reportedBy: "Kone Ibrahim", createdAt: "2026-06-18T17:30:00" },
  { id: 6, type: "accident", description: "Chute de pieton sur chaussee glissante", lat: 5.4213, lng: -4.0185, status: "resolu", cameraId: 5, reportedBy: "Systeme IA", createdAt: "2026-06-16T08:15:00" },
  { id: 7, type: "intrusion", description: "Vehicule stationne en zone interdite depuis 3h", lat: 5.4219, lng: -4.0191, status: "nouveau", cameraId: 3, reportedBy: "Systeme IA", createdAt: "2026-06-18T11:00:00" },
  { id: 8, type: "vol", description: "Vol a l'etalage au marche", lat: 5.4210, lng: -4.0182, status: "resolu", cameraId: 6, reportedBy: "Commerçant", createdAt: "2026-06-15T14:20:00" },
];

const alerts = [
  { id: 1, type: "vehicle", message: "Vehicule recherche AB-1234-CI detecte par CAM-02", severity: "critical", cameraId: 2, acknowledged: false, createdAt: "2026-06-18T17:45:00" },
  { id: 2, type: "intrusion", message: "Mouvement detecte zone ecole (hors horaires)", severity: "high", cameraId: 4, acknowledged: false, createdAt: "2026-06-18T22:30:00" },
  { id: 3, type: "fire", message: "Fumee detectee pres sortie ouest", severity: "critical", cameraId: 6, acknowledged: true, createdAt: "2026-06-18T16:02:00" },
  { id: 4, type: "crowd", message: "Rassemblement inhabituel au marche", severity: "medium", cameraId: 6, acknowledged: false, createdAt: "2026-06-18T12:15:00" },
  { id: 5, type: "vehicle", message: "Plaque non lisible - vehicule suspect", severity: "low", cameraId: 1, acknowledged: true, createdAt: "2026-06-18T09:30:00" },
];

const vehicles = [
  { id: 1, plate: "AB-1234-CI", lastCamera: "CAM-02 Zone Commerciale", lastSeen: "2026-06-18T17:45:00", flagged: true, reason: "Vehicule vole" },
  { id: 2, plate: "CD-5678-CI", lastCamera: "CAM-01 Carrefour Nord", lastSeen: "2026-06-18T16:30:00", flagged: false, reason: null },
  { id: 3, plate: "EF-9012-CI", lastCamera: "CAM-06 Sortie Ouest Q 125", lastSeen: "2026-06-18T15:12:00", flagged: true, reason: "Recherche par police" },
  { id: 4, plate: "GH-3456-CI", lastCamera: "CAM-06 Marche", lastSeen: "2026-06-18T14:45:00", flagged: false, reason: null },
  { id: 5, plate: "IJ-7890-CI", lastCamera: "CAM-03 Pharmacie", lastSeen: "2026-06-18T13:20:00", flagged: false, reason: null },
  { id: 6, plate: "KL-2345-CI", lastCamera: "CAM-05 Mosquee", lastSeen: "2026-06-18T11:05:00", flagged: true, reason: "Assurance expiree" },
];

const stats = {
  camerasActive: 6,
  camerasTotal: 6,
  incidentsActifs: 4,
  incidentsTotal: 8,
  alertesNonLues: 3,
  alertesTotal: 5,
  vehiculesDetectes: 147,
  vehiculesSignales: 3,
  citoyensInscrits: 234,
  incidentsParHeure: [2, 1, 0, 0, 0, 1, 3, 5, 8, 12, 9, 7, 6, 8, 10, 14, 11, 9, 7, 5, 4, 3, 2, 1],
  incidentsParType: { vol: 45, accident: 23, intrusion: 18, incendie: 5, autre: 9 },
  incidentsParJour: [
    { jour: "Lun", count: 12 },
    { jour: "Mar", count: 8 },
    { jour: "Mer", count: 15 },
    { jour: "Jeu", count: 10 },
    { jour: "Ven", count: 18 },
    { jour: "Sam", count: 22 },
    { jour: "Dim", count: 7 },
  ],
  iaModules: [
    { name: "Reconnaissance de plaques", accuracy: 97.3, detectionsToday: 147, status: "active" },
    { name: "Detection d'incidents", accuracy: 94.1, detectionsToday: 23, status: "active" },
    { name: "Comptage vehicules", accuracy: 98.7, detectionsToday: 892, status: "active" },
    { name: "Analyse comportementale", accuracy: 91.2, detectionsToday: 5, status: "active" },
  ],
};

const signalements = [
  { id: 1, description: "Eclairage public en panne devant la mosquee", category: "infrastructure", lat: 5.4213, lng: -4.0185, photo: null, citizenName: "Ouattara Seydou", citizenPhone: "07-12-34-56", status: "nouveau", createdAt: "2026-06-18T08:30:00" },
  { id: 2, description: "Trou dangereux sur la chaussee pres du marche", category: "voirie", lat: 5.4210, lng: -4.0182, photo: null, citizenName: "Bamba Aissatou", citizenPhone: "05-67-89-01", status: "traite", createdAt: "2026-06-17T10:15:00" },
  { id: 3, description: "Regroupement suspect chaque soir devant l'ecole", category: "securite", lat: 5.4216, lng: -4.0188, photo: null, citizenName: "Coulibaly Drissa", citizenPhone: "01-23-45-67", status: "en_cours", createdAt: "2026-06-18T19:00:00" },
  { id: 4, description: "Vehicule abandonne depuis 5 jours sur le trottoir", category: "securite", lat: 5.4219, lng: -4.0191, photo: null, citizenName: "Toure Mariam", citizenPhone: "07-89-01-23", status: "nouveau", createdAt: "2026-06-18T14:45:00" },
  { id: 5, description: "Fuite d'eau importante au carrefour nord", category: "infrastructure", lat: 5.4225, lng: -4.0197, photo: null, citizenName: "Diallo Mamadou", citizenPhone: "05-45-67-89", status: "cloture", createdAt: "2026-06-16T07:00:00" },
  { id: 6, description: "Odeur de gaz pres de la station essence", category: "urgence", lat: 5.4207, lng: -4.0179, photo: null, citizenName: "Konate Fanta", citizenPhone: "01-56-78-90", status: "traite", createdAt: "2026-06-18T11:20:00" },
];

module.exports = { cameras, incidents, alerts, vehicles, stats, signalements };
