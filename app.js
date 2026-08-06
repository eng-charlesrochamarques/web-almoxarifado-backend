const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsRouter = require("./routes/items");
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/web-almoxarifado");

app.use(cors());
app.use(express.json());
app.use("/items", itemsRouter);
app.get("/", (req, res) => {
  res.send({ message: "Web Almoxarifado API" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
