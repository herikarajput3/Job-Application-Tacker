import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import Dashboard from "./pages/dashboard/Dashboard"
import Applications from "./pages/applications/Applications"
import  { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <Router>
      <Toaster toastOptions={{ duration: 3000 }} position="bottom-right" />
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App