import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USERS = [
  { id: 1, username: "admin", password: "Admin2026!", name: "Kouassi Jean-Marc", role: "Administrateur", avatar: "KJ" },
  { id: 2, username: "operateur", password: "Oper2026!", name: "Traore Aminata", role: "Operateur", avatar: "TA" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("smartstreet_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loginHistory, setLoginHistory] = useState(() => {
    const stored = sessionStorage.getItem("smartstreet_history");
    return stored ? JSON.parse(stored) : [];
  });

  function login(username, password) {
    const found = USERS.find((u) => u.username === username && u.password === password);
    if (!found) return { success: false, error: "Identifiants incorrects" };

    const { password: _, ...userData } = found;
    setUser(userData);
    sessionStorage.setItem("smartstreet_user", JSON.stringify(userData));

    const entry = { user: userData.name, role: userData.role, date: new Date().toISOString(), action: "Connexion" };
    const updated = [entry, ...loginHistory].slice(0, 20);
    setLoginHistory(updated);
    sessionStorage.setItem("smartstreet_history", JSON.stringify(updated));

    return { success: true };
  }

  function logout() {
    if (user) {
      const entry = { user: user.name, role: user.role, date: new Date().toISOString(), action: "Deconnexion" };
      const updated = [entry, ...loginHistory].slice(0, 20);
      setLoginHistory(updated);
      sessionStorage.setItem("smartstreet_history", JSON.stringify(updated));
    }
    setUser(null);
    sessionStorage.removeItem("smartstreet_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loginHistory }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
