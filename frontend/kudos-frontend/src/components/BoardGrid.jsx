import { Link } from "react-router-dom";

export default function BoardGrid({ boards, onDelete }) {
  return (
    <div className="grid-boards">
      {boards.map((b) => (
        <div key={b.board_id} className="card board-card">
          <Link to={`/boards/${b.board_id}`}>
            <img
              src={b.gif || "https://via.placeholder.com/150"}
              alt="Board image"
            />
            <h3>{b.title}</h3>
          </Link>
          <button onClick={() => onDelete(b.board_id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
