import { Link } from "react-router-dom";
import "./BoardGrid.css";

export default function BoardGrid({ boards, onDelete }) {
  return (
    <div className="grid boards">
      {boards.map((b) => {
        // Destructure board properties
        const { board_id, title } = b;
        // Create a random photo for each board upon reload
        const randomInt = Math.floor(Math.random() * 9) + 1;

        return (
          <div key={board_id} className="card board-card">
            <Link to={`/boards/${board_id}`}>
              <img
                src={`https://picsum.photos/800/800?random=${randomInt}`}
                alt="Board image"
                className="board-image"
              />
              <h3 className="board-title">{title}</h3>
            </Link>
            <button onClick={() => onDelete(board_id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
