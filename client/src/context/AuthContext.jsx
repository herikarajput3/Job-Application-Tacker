import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import API from "../service/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  // Fetch Current User

  const fetchCurrentUser = async () => {

    const token =
      localStorage.getItem("token");

    // No token
    if (!token) {

      setAuthLoading(false);

      return;

    }

    try {

      const response = await API.get(
        "/auth/me"
      );

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

      localStorage.removeItem("token");

      setUser(null);

    } finally {

      setAuthLoading(false);

    }

  };

  // Load User On App Start

  useEffect(() => {

    fetchCurrentUser();

  }, []);

  // Logout



  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        authLoading,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

// Custom Hook

export const useAuth = () =>
  useContext(AuthContext);