const express = require("express");
const db = require("./db.js");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require('dotenv').config()
const PORT = process.env.PORT ||3000;
const personRouter = require("./routes/personRoute.js");
const menuRouter = require("./routes/menuRoute.js");

app.use("/person", personRouter);
app.use("/menu", menuRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my hotel... How i can help yon?");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
