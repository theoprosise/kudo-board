// components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const submit = (e) => {
    e.preventDefault();
    onSearch(q);
  };
  const clear = () => {
    setQ(""), onSearch("");
  };
  return (
    <form onSubmit={submit}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search Boards..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={clear}>
        Clear
      </button>
    </form>
  );
}
