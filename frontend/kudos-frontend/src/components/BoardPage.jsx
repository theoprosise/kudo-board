import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCards,
  createCard,
  upvoteCard,
  pinCard,
  deleteCard,
} from "../api";
import Header from "./Header";
import Footer from "./Footer";
import CardGrid from "./CardGrid";
import NewCardForm from "./NewCardForm";
import "./BoardPage.css"

export default function BoardPage() {
  const { boardId } = useParams();
  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const load = async () => {
    const data = await fetchCards(boardId);
    setCards(data);
  };
  useEffect(() => {
    load();
  }, [boardId]);

  const handlers = {
    upvote: async (id) => {
      await upvoteCard(boardId, id);
      load();
    },
    pin: async (id) => {
      await pinCard(boardId, id);
      load();
    },

    delete: async (id) => {
      await deleteCard(boardId, id);
      load();
    },

    commentAdded: async () => {
      load();
    },

    addCard: async (cardData) => {
      await createCard(boardId, cardData);
      load();
    },
  };

  return (
    <>
      <Header />
      <button onClick={() => setOpenModal(true)}>Create New</button>
      <main>
        {openModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <NewCardForm
                onCreate={handlers.addCard}
                onClose={() => setOpenModal(false)}
              />
            </div>
          </div>
        )}
        <CardGrid cards={cards} {...handlers} />
      </main>
      <Footer />
    </>
  );
}
