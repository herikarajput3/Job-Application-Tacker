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

  // Check auth status

  const isAuthenticated = !!user;

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
      console.log(response.data.user, "user");

    } catch (error) {

      console.log("Failed to fetch current user", error);

      localStorage.removeItem("token");

      setUser(null);

    } finally {

      setAuthLoading(false);

    }

  };

  // Login

  const login = async (email, password) => {
    const response = await API.post("/auth/login", { email, password });

    // save token
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);

    return response.data;
  };

  // Register

  const register = async (name, email, password) => {
    const response = await API.post("/auth/register", { name, email, password });

    // save token
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    return response.data;
  }

  // Logout

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  // Load User On App Start

  useEffect(() => {

    fetchCurrentUser();

  }, []);

  return (

    <AuthContext.Provider
      value={{
        // state
        user,
        authLoading,
        isAuthenticated,

        // actions
        login,
        register,
        logout,
        fetchCurrentUser,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

// Custom Hook

export const useAuth = () =>
  useContext(AuthContext);