import { Link } from "react-router-dom";
import "./BoardGrid.css";
export default function BoardGrid({ boards, onDelete }) {
  const randomInt = Math.floor(Math.random() * 9) + 1;

  return (
    <div className="grid boards">
      {boards.map((b) => {
        const randomInt = Math.floor(Math.random() * 9) + 1;
        return (
          <div key={b.board_id} className="card board-card">
            <Link to={`/boards/${b.board_id}`}>
              <img
                src={b.gif || `https://picsum.photos/800/800?random=${randomInt}`}
                alt="Board image"
                className="board-image"
              />
              <h3>{b.title}</h3>
            </Link>
            <button onClick={() => onDelete(b.board_id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
