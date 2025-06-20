import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import {
  fetchCards,
  createCard,
  upvoteCard,
  pinCard,
  deleteCard,
} from "../../api";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CardGrid from "../CardGrid/CardGrid";
import NewCardForm from "../NewCardForm/NewCardForm";

import "./BoardPage.css";

export default function BoardPage() {
  const { boardId } = useParams();
  const [cards, setCards] = useState([]);
  // Modal state for creating a new card
  const [openModal, setOpenModal] = useState(false);

  // Remove unnecessary rerenders with memoization of functions
  const load = useCallback(async () => {
    const data = await fetchCards(boardId);
    setCards(data);
  }, [boardId]);

  // Initial load or boardId change
  useEffect(() => {
    load();
  }, [boardId]);

  // Create functions for card specific actions to be used as parameters
  const upvote = useCallback(
    async (id) => {
      await upvoteCard(boardId, id);
      load();
    },
    [boardId, load]
  );

  const pin = useCallback(
    async (id) => {
      await pinCard(boardId, id);
      load();
    },
    [boardId, load]
  );

  const handleDelete = useCallback(
    async (id) => {
      await deleteCard(boardId, id);
      load();
    },
    [boardId, load]
  );

  const commentAdded = useCallback(async () => {
    load();
  }, [load]);

  const addCard = useCallback(
    async (cardData) => {
      await createCard(boardId, cardData);
      load();
    },
    [boardId, load]
  );

  return (
    <>
      <Header />
      <main className="board-page-content">
        <div className="new-card-btn-wrap">
          <button className="new-card-btn" onClick={() => setOpenModal(true)}>
            Create New Card
          </button>
        </div>

        {openModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <NewCardForm
                onCreate={addCard}
                onClose={() => setOpenModal(false)}
              />
            </div>
          </div>
        )}
        <CardGrid
          cards={cards}
          upvote={upvote}
          pin={pin}
          delete={handleDelete}
          commentAdded={commentAdded}
        />
      </main>
      <Footer />
    </>
  );
}
