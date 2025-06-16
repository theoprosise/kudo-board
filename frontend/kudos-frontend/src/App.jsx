import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage"
import BoardPage from "./components/BoardPage"
import {ThemeProvider} from './contexts/ThemeContext';

function App() {
  return (
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
