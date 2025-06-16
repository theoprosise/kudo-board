// components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1>My Boards</h1>
      </Link>
      <DarkModeToggle />
    </header>
  );
}
