import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import BoardPage from "./components/BoardPage/BoardPage";
// Custom context for dark/light mode
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    // Wrap the app in ThemeProvider to make dark mode context available globally
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
