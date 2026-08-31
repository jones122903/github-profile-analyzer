const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/database");

const app = express();

const routes = require("./routes/githubRoutes");

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    message: "GitHub Analyzer API Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});