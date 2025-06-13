const express = require("express");
const cors = require("cors");
const boardRoutes = require("./routes/boardRoutes");
const cardRoutes = require("./routes/cardRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Use card routes under /boards/:boardId
app.use("/boards", boardRoutes);
app.use("/boards/:boardId/cards", cardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
