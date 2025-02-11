import { useContext } from "react";
import { AuthContextType } from "../types";
import { AuthContext } from "../context/AuthContext";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
