import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

// Crear el contexto
const AuthContext = createContext();

// Componente Proveedor
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Firebase avisa cada vez que la sesión cambia
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingSession(false);
    });

    // Limpieza de la suscripción al desmontar
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, checkingSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
