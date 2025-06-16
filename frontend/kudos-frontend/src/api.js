const BASEURL = "http://localhost:3000";

export async function fetchBoards({ category, search } = {}) {
  const params = newURLSearchParams();
  if (category && category !== "All") params.append("category", category);
  if (search) params.append("saerch", search);
  const res = await fetch(`${BASE}/boards?${params}`);
  return res.json();
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

export async function createComment(boardId, cardId) {
  return fetch(`${BASEURL}/boards/${boardId}/cards/${cardId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  }).then((r) => r.json());
}
