const express = require("express");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/game");

const app = express();

app.use(bodyParser.json());
app.use("/api", gameRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
