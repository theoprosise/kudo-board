// components/GifFetcher.jsx
import React, { useState } from "react";

const API_KEY = "NeKmhNXPtS6sfIDicPUs0uadQB6tdfrs";

export default function GifFetcher({ selected, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
        query
      )}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );
    const { data } = await res.json();
    setResults(data.map((g) => g.images.fixed_height.url));
  };

  return (
    <div className="gif-picker">
      <div className="gif-search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for GIF"
        />
        <button type="button" onClick={search}>Search</button>
      </div>
      <div className="grid gif-results">
        {results.map((url) => (
          <img
            key={url}
            src={url}
            className={url === selected ? "selected" : ""}
            onClick={() => onSelect(url)}
            alt="Gifs for search"
          />
        ))}
      </div>
    </div>
  );
}
