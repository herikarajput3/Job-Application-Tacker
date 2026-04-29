import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import Dashboard from "./pages/dashboard/Dashboard"
import Applications from "./pages/applications/Applications"
const App = () => {
  return (
    <Router>
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