import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import Dashboard from "./pages/dashboard/Dashboard"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Dashboard />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App