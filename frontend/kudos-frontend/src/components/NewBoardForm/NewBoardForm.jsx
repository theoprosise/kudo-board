// components/NewBoardForm.jsx
import React, { use, useState } from "react";
import "./NewBoardForm.css";
export default function NewBoardForm({ onCreate, onClose }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [owner, setOwner] = useState("");

  // Allow for simplicity in changing options in the future
  const categoryOptions = ["Celebration", "Thank You", "Inspiration"];

  const submit = (e) => {
    e.preventDefault();
    onCreate({ title, category, owner });
    setTitle("");
    setCategory("");
    setOwner("");
  };

  // Modal with form for creation of a a new board
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close" onClick={onClose}>
          CLOSE
        </button>
        <form onSubmit={submit} className="new-board-form">
          <input
            required
            placeholder="Board title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select category
            </option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            placeholder="Author (Optional)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <button type="submit">Create New Board</button>
        </form>
      </div>
    </div>
  );
}
