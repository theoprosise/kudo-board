// components/NewBoardForm.jsx
import React, { use, useState } from "react";

export default function NewBoardForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [owner, setOwner] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onCreate({ title, category, owner });
    setTitle("");
    setCategory("");
    setOwner("");
  };

  return (
    <form onSubmit={submit} className="new-board-form">
      <h2>Create New Board</h2>
      <input
        required
        placeholder="Board title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Celebration">Celebration</option>
        <option value="Thank You">Thank You</option>
        <option value="Inspiration">Inspiration</option>
      </select>
      <input
        required
        placeholder="Author (Optional)"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <button type="submit">Create New Board</button>
    </form>
  );
}
