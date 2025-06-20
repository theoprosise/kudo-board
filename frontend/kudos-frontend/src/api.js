const BASEURL = import.meta.env.VITE_BASE_URL;

export async function fetchBoards({ category, search } = {}) {
  const params = new URLSearchParams();
  if (category && category !== "All" && category !== "Recent")
    params.append("category", category);
  if (search) params.append("search", search);

  const res = await fetch(`${BASEURL}/boards?${params}`);
  const boards = await res.json();

  // Apply client-side recent sorting if category is "recent" - top 6 only
  if (category === "Recent") {
    const recentBoards = boards
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    return recentBoards;
  }

  return boards;
}

export async function createBoard(data) {
  const res = await fetch(`${BASEURL}/boards/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBoard(boardId) {
  await fetch(`${BASEURL}/boards/${boardId}`, {
    method: "DELETE",
  });
}

export async function fetchCards(boardId) {
  const res = await fetch(`${BASEURL}/boards/${boardId}/cards`);
  if (!res.ok) {
    throw new Error(`Failed to fetch cards for board ${boardId}`);
  }

  return res.json();
}

export async function createCard(boardId, cardData) {
  const res = await fetch(`${BASEURL}/boards/${boardId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });

  if (!res.ok) {
    throw new Error(`Failed to create card on board ${boardId}`);
  }

  return res.json();
}

export async function upvoteCard(boardId, cardId) {
  return await fetch(`${BASEURL}/boards/${boardId}/cards/${cardId}/upvote`, {
    method: "PATCH",
  }).then((r) => r.json());
}

// Toggle pin state for a specific card
export async function pinCard(boardId, cardId) {
  return await fetch(`${BASEURL}/boards/${boardId}/cards/${cardId}/pin`, {
    method: "PATCH",
  }).then((r) => r.json());
}

export async function deleteCard(boardId, cardId) {
  return fetch(`${BASEURL}/boards/${boardId}/cards/${cardId}`, {
    method: "DELETE",
  });
}

export async function fetchComments(boardId, cardId) {
  const res = await fetch(
    `${BASEURL}/boards/${boardId}/cards/${cardId}/comments`
  );
  return res.json();
}

export async function createComment(boardId, cardId, commentData) {
  return fetch(`${BASEURL}/boards/${boardId}/cards/${cardId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  }).then((r) => r.json());
}
