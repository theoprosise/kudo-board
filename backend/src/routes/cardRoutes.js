const express = require("express");

const {
  getCardsForBoard,
  createCardForBoard,
  upvoteCard,
  pinCard,
  deleteCard,
} = require("../controllers/cardController");

const commentRouter = require("./commentRoutes");

// Allows parent access to boardID
const router = express.Router({ mergeParams: true });

router.get("/", getCardsForBoard);
router.post("/", createCardForBoard);
router.patch("/:id/upvote", upvoteCard);
router.patch("/:id/pin", pinCard);
router.delete("/:id", deleteCard);
// Nest comment routes under a specific card
router.use("/:cardId/comments", commentRouter);

module.exports = router;
