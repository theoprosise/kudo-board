const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();


exports.getCardsForBoard = async (req, res) => {
  const boardId = Number(req.params.boardId);
  const cards = await prisma.card.findMany({
    where:{
        board_id:boardId
    }, orderBy: [
        {pinned: 'desc'},
        {pinnedAt: 'desc'},
        {createdAt: 'desc'}
    ],
  });
  res.json(cards);
};

exports.createCardForBoard = async (req, res) => {
  const boardId = Number(req.params.boardId);
  const {message, gif, owner} = req.body;
  if (!message || !gif) {
    return res.status(404).json({ error: "Message and gif required" });
  }
  const card = await prisma.card.create({
    data: { message, gif, owner, board_id:boardId },
  });
  res.status(201).json(card);
};


exports.upvoteCard = async(req,res) =>{
    const id = Number(req.params.id);
    const card = await prisma.card.update({
        where: {card_id:id},
        data:{ votes: {increment:1}
        },
    });
    res.json(card);
}
exports.pinCard = async(req,res) =>{
    const id = Number(req.params.id);
    const existing = await prisma.card.findUnique({where: {card_id:id}});
    const updated = await prisma.card.update({
        where: {card_id:id},
        data:{
            pinned:!existing.pinned,
            pinnedAt:existing.pinned ? null : new Date(),
        },
    });
    res.json(updated);
}

exports.deleteCard = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.card.delete({ where: { card_id: id } });
  res.status(204).end();
};
