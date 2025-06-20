const express = require("express");

const {
  getCommentsForCard,
  createCommentForCard,
} = require("../controllers/commentController");

// Allow access to cardId from parent route
const router = express.Router({ mergeParams: true });

router.get("/", getCommentsForCard);
router.post("/", createCommentForCard);

module.exports = router;
