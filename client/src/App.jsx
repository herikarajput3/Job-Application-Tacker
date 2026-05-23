import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Dashboard from "./pages/dashboard/Dashboard"
import Applications from "./pages/applications/Applications"
import { Toaster } from "react-hot-toast";
import ApplicationDetails from "./pages/applications/ApplicationDetails";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
const App = () => {
  return (
    <Router>

      <Toaster toastOptions={{ duration: 3000 }} position="bottom-right" />

      <Routes>
        {/* Public Routes */}

        <Route
<<<<<<< HEAD
          path="/register"
=======
          path="/login"
>>>>>>> 1fb4d0d257a0d28135ee1cc8d4367fc0c226137e
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
        {/* PROTECTED ROUTES */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/applications"
            element={<Applications />}
          />

          <Route
            path="/applications/:id"
            element={<ApplicationDetails />}
          />
        </Route>

        {/* Wildcard Route */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  )
}

export default App