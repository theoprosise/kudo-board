const express = require("express");
const {
  getCommentsForCard,
  createCommentForCard
} = require("../controllers/commentController");

const router = express.Router({mergeParams: true});

router.get("/", getCommentsForCard);
router.post("/", createCommentForCard);

module.exports = router;
