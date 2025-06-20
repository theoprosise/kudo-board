import React, { useState } from "react";
import CommentModal from "../CommentModal/CommentModal";

import "../CardItem/CardItem.css";

export default function CardItem({
  card,
  onUpvote,
  onPin,
  onDelete,
  onCommentAdded,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`card ${card.pinned ? "pinned" : ""}`}>
      <div className="card-content-not-pin">
        <div className="gif-container">
          <img className="card-gif" src={card.gif} alt="gif for card" />
        </div>

        <h3>{card.message}</h3>

        <div className="card-actions">
          <button onClick={onUpvote}>Upvote {card.votes}</button>
          <button onClick={onPin}>
            {card.pinned ? "Pinned" : "Not pinned"}
          </button>
          <button onClick={onDelete}>🗑️</button>
          <button onClick={() => setOpen(true)}>Comments</button>
        </div>

        {open && (
          <CommentModal
            card={card}
            boardId={card.board_id}
            onClose={() => setOpen(false)}
            onCommentAdded={onCommentAdded}
          />
        )}
      </div>
    </div>
  );
}
