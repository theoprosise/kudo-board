import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function DarkModeToggle() {
  const { darkMode, toggle } = useContext(ThemeContext);

  return <button onClick={toggle}>{darkMode ? "🌙" : "☀️"}</button>;
}
