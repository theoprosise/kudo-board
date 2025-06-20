const express = require("express");
const cors = require("cors");

const boardRoutes = require("./routes/boardRoutes");
const cardRoutes = require("./routes/cardRoutes");

const app = express();

// Middleware to parse json api calls
app.use(express.json());
app.use(cors());

// Use card routes under /boards/:boardId - correspond to their overarching card
app.use("/boards", boardRoutes);
app.use("/boards/:boardId/cards", cardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
