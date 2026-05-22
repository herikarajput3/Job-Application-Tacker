import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import Dashboard from "./pages/dashboard/Dashboard"
import Applications from "./pages/applications/Applications"
import { Toaster } from "react-hot-toast";
import ApplicationDetails from "./pages/applications/ApplicationDetails";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <Router>

      <Toaster toastOptions={{ duration: 3000 }} position="bottom-right" />

      <Routes>
        {/* Public Routes */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
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
      </Routes>
    </Router>
  )
}

export default App