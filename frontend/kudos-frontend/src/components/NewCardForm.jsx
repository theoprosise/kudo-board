// components/NewCardForm.jsx
import React, { useState } from "react";
import GifPicker from "./GifPicker";
import "./NewCardForm.css"
export default function NewCardForm({ onCreate }) {
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

  return (
    <form onSubmit={submit} className="new-card-form">
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
    </form>
  );
}
