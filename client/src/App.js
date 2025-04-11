import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLayout from "./pages/SidebarLayout.js";
import SentimentDashboard from "./pages/SentimentDashboard.js";
import AboutPage from "./pages/AboutPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route path="/dashboard" element={<SentimentDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route index element={<SentimentDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
