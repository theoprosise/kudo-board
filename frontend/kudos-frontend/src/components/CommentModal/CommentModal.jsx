import React, { useState, useEffect } from "react";
import "./CommentModal.css";
import { fetchComments, createComment } from "../../api";

export default function CommentModal({
  card,
  boardId,
  onClose,
  onCommentAdded,
}) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  // Added destructuring to card properties
  const { card_id, message, owner, gif } = card;

  // Get comments when modal loads
  const load = async () => {
    const data = await fetchComments(boardId, card_id);
    setComments(data);
  };

  useEffect(() => {
    load();
  }, []);

  // Form submission for new comments
  const submit = async (e) => {
    e.preventDefault();

    await createComment(boardId, card_id, {
      message: body,
      author,
    });

    setBody("");
    setAuthor("");
    load();
    onCommentAdded();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close" onClick={onClose}>
          CLOSE
        </button>
        <h2>{message}</h2>
        <h3>By: {owner}</h3>
        <img src={gif} alt="Card GIF" />
        <div className="comments-list">
          {comments.map((c) => (
            <div key={c.id} className="comment">
              <p>{c.message}</p>
              {c.author && <small>- {c.author}</small>}
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="new-comment-form">
          <input
            required
            placeholder="Add comment here"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            placeholder="Author (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
}
