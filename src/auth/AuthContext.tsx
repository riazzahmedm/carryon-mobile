import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  token: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((stored) => {
      setToken(stored);
      setLoading(false);
    });
  }, []);

  const signIn = async (jwt: string) => {
    await SecureStore.setItemAsync("token", jwt);
    setToken(jwt);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
