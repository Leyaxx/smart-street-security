import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cameras from "./pages/Cameras";
import MapPage from "./pages/MapPage";
import Incidents from "./pages/Incidents";
import AiAnalysis from "./pages/AiAnalysis";
import Plaques from "./pages/Plaques";
import Statistics from "./pages/Statistics";
import AdminUsers from "./pages/AdminUsers";
import AdminCyber from "./pages/AdminCyber";

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Login />;
  return children;
}

function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user) return <Login />;
  if (user.role !== "Administrateur") return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="cameras" element={<Cameras />} />
            <Route path="carte" element={<MapPage />} />
            <Route path="incidents" element={<Incidents />} />
            <Route path="ia" element={<AiAnalysis />} />
            <Route path="plaques" element={<Plaques />} />
            <Route path="statistiques" element={<Statistics />} />
            <Route path="admin/utilisateurs" element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
            <Route path="admin/cybersecurite" element={<RequireAdmin><AdminCyber /></RequireAdmin>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
