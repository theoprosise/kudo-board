const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

exports.getBoards = async (req, res) => {
  const { category, search } = req.query;
  const where = {
    ...(category && { category }),
    title: { contains: search || "", mode: "insensitive" },
  };
  const findOpts =
    category === "Recent"
      ? { where, orderBy: { createdAt: "desc" }, take: 6 }
      : { where };

  const boards = await prisma.board.findMany(findOpts);
  res.json(boards);
};

exports.getBoardById = async (req, res) => {
  const id = Number(req.params.id);
  const board = await prisma.board.findUnique({
    where: { board_id: id },
    include: { Card: true },
  });
  if (!board) return res.status(404).json({ error: "Not Found" });
  res.json(board);
};

exports.createBoard = async (req, res) => {
  const { title, category, owner } = req.body;
  if (!title || !category) {
    return res.status(404).json({ error: "Title and category required" });
  }
  const board = await prisma.board.create({
    data: { title, category, owner },
  });
  res.status(201).json(board);
};

exports.deleteBoard = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.board.delete({
    where: { board_id: id },
    include: { Card: { include: { comment: true } } },
  });
  res.status(204).end();
};
