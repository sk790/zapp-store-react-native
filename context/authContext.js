import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const setUserInfo = async (userInfo) => {
    setUser(userInfo);
    await AsyncStorage.setItem("user", JSON.stringify(userInfo));
  };
  const loadUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  };
  const loadLocation = async () => {
    const location = await AsyncStorage.getItem("location");
    if (location) {
      setLocation(JSON.parse(location));
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUserInfo, loadUser, location, loadLocation, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
