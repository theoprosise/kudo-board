// components/NewCardForm.jsx
import React, { useState } from "react";
import GifPicker from "../GifPicker/GifPicker";

export default function NewCardForm({ onCreate, onClose }) {
  const [message, setMessage] = useState("");
  const [gif, setGif] = useState("");
  const [author, setAuthor] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onCreate({ message, gif, owner: author });
    setMessage("");
    setGif("");
    setAuthor("");
  };

  // Modal with form for creation of new card
  return (
    <form onSubmit={submit} className="new-card-form">
      <div className="new-card-content">
        <textarea
          required
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <GifPicker selected={gif} onSelect={setGif} />
        <input
          placeholder="Author (Optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit" disabled={!gif}>
          Create Card
        </button>
        <button className="close" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </form>
  );
}
