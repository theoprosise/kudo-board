import React, { useState } from "react";
import CommentModal from "./CommentModal";
import "./CardItem.css"
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
      <img className="card-gif" src={card.gif} alt="gif for card" />
      <p>{card.message}</p>
      <div className="card-actions">
        <button onClick={onUpvote}>Upvote {card.votes}</button>
        <button onClick={onPin}>{card.pinned ? "Pinned" : "Not pinned"}</button>
        <button onClick={onDelete}>Delete</button>
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
