import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const setUserToken = async (token) => {
    setToken(token);
    await AsyncStorage.setItem("token", JSON.stringify(token));
  };
  const setUserInfo = async (userInfo) => {
    setUser(userInfo);
  };
  const loadToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setUserToken(JSON.parse(token));
    }
  };
  const setUserLocation = async (coords) => {
    await AsyncStorage.setItem("location", JSON.stringify(coords));
    setLocation(coords);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUserToken(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUserInfo,
        loadToken,
        location,
        setUserLocation,
        logout,
        setUserToken,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
