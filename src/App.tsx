import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;