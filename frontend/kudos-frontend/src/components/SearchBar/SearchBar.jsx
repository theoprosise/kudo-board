// components/SearchBar.jsx
import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const clear = () => {
    setQuery(""), onSearch("");
  };

  return (
    <form className="search-form" onSubmit={submit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Boards..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={clear}>
        Clear
      </button>
    </form>
  );
}
