import React, { createContext, useState, useEffect } from "react";
import { User } from "../types";
import api from "../services/api";
import Cookies from "js-cookie";
import LoadingScreen from "../components/layout/LoadingScreen";
import { AuthContextType } from "../types";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await api.get<User>("/api/users", {
            headers: { authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          Cookies.remove("token");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; 
