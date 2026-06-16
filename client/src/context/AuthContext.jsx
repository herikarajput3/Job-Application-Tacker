import {
  createContext,
  useCallback,
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

  const fetchCurrentUser = useCallback(
    async () => {

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

    },
    []
  );

  // Login

  const login = async (formData) => {
    const response = await API.post("/auth/login", formData);

    // save token
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);

    return response.data;
  };

  // Register

  const register = async (formData) => {
    const response = await API.post("/auth/register", formData);

    // save token
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    return response.data;
  }

  // Logout

  const logout = async () => {

    try {

      await API.post(
        "/auth/logout"
      );

    } catch (error) {

      console.error(error);

    } finally {

      localStorage.removeItem(
        "token"
      );

      setUser(null);

    }

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