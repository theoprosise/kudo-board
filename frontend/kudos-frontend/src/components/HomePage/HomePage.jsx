import React, { useState, useEffect, useCallback } from "react";
import { fetchBoards, createBoard, deleteBoard } from "../../api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import BoardGrid from "../BoardGrid/BoardGrid";
import NewBoardForm from "../NewBoardForm/NewBoardForm";
import "./HomePage.css";

const categories = ["All", "Recent", "Celebration", "Thank You", "Inspiration"];

export default function HomePage() {
  const [boards, setBoards] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpenNew] = useState(false);

  // Prevent functions from unnecessary rerenders with useCallback
  const load = useCallback(async () => {
    const data = await fetchBoards({ category, search });
    setBoards(data);
  }, [category, search]);

  useEffect(() => {
    load();
  }, [category, search]);

  const handleCreate = useCallback(
    async (b) => {
      await createBoard(b);
      load();
    },
    [load]
  );

  const handleDelete = useCallback(
    async (id) => {
      await deleteBoard(id);
      load();
    },
    [load]
  );

  return (
    <>
      <Header />
      <main className="main-content">
        <section className="banner">Board Gallery Section</section>

        <SearchBar onSearch={setSearch} />
        <h3 className="sort-title">Sort Boards:</h3>
        <div className="wrap-button-cat">
          <CategoryFilter
            selected={category}
            categories={categories}
            onChange={setCategory}
          />
          <button
            className="open-create-new-board"
            onClick={() => setOpenNew(true)}
          >
            Create New Board
          </button>
        </div>
        {open && (
          <NewBoardForm
            onCreate={handleCreate}
            onClose={() => setOpenNew(false)}
          />
        )}

        <BoardGrid boards={boards} onDelete={handleDelete} />
      </main>
      <Footer />
    </>
  );
}
