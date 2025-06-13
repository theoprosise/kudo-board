const express = require("express");

const cardRouter = require('./cardRoutes');

const {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
} = require("../controllers/boardController");

const router = express.Router();

router.get("/:id", getBoardById);
router.get("/", getBoards);
router.post("/", createBoard);

router.delete("/:id", deleteBoard);

module.exports = router;
