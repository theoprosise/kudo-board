import React, { useState, useEffect } from "react";
import { fetchBoards, createBoard, deleteBoard } from "../api";
import Header from "./Header";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import BoardGrid from "./BoardGrid";
import NewBoardForm from "./NewBoardForm";
import "./HomePage.css";

const categories = ["All", "Celebration", "Thank You", "Inspiration"];

export default function HomePage() {
  const [boards, setBoards] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpenNew] = useState(false);

  const load = async () => {
    const data = await fetchBoards({ category, search });
    setBoards(data);
  };

  useEffect(() => {
    load();
  }, [category, search]);

  const handleCreate = async (b) => {
    await createBoard(b);
    load();
  };

  const handleDelete = async (id) => {
    await deleteBoard(id);
    load();
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <section className="banner">Board Gallery Section</section>

        <SearchBar onSearch={setSearch} />
        <CategoryFilter
          selected={category}
          categories={categories}
          onChange={setCategory}
        />
        <button className="open-create-new-board" onClick={() => setOpenNew(true)}>Create New Board</button>
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
