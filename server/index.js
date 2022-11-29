const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ limit: "100mb", extended: "true" }));
app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.post("/player", (req, res) => {
  console.log(req.body);
});

app.get("/player", (req, res) => {});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
