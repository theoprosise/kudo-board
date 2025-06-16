// components/CategoryFilter.jsx
import React from "react";
import "./CategoryFilter.css"

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <nav className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={cat === selected ? "active" : ""}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
