const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const itemsRouter = require("./routes/items");
const usersRouter = require("./routes/users");
const errorHandler = require("./middlewares/error-handler");
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/web-almoxarifado");

app.use(cors());
app.use(express.json());

app.use("/items", itemsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send({ message: "Web Almoxarifado API" });
});

app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado nao encontrado" });
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
