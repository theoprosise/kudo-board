const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

exports.getCommentsForCard = async (req, res) => {
  const boardId = Number(req.params.boardId);
  const cardId = Number(req.params.cardId);

  try {
    const card = await prisma.card.findUnique({
      where: { card_id: cardId },
    });
    if (!card || card.board_id !== boardId) {
      return res.status(404).json({ error: "card not on this board" });
    }
    const comments = await prisma.comment.findMany({
      where: { cardId },
      orderBy: { createdAt: "asc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createCommentForCard = async (req, res) => {
  const boardId = Number(req.params.boardId);
  const cardId = Number(req.params.cardId);
  const { message, author } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }
  try {
    const card = await prisma.card.findUnique({
      where: { card_id: cardId },
    });
    if (!card || card.board_id !== boardId) {
      return res.status(404).json({ error: "card not on this board" });
    }
    const comment = await prisma.comment.create({
      data: { message, author, cardId },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
