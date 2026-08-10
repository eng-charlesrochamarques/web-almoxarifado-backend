require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const auth = require("./middlewares/auth");

const itemsRouter = require("./routes/items");

const { login, createUser, getCurrentUser } = require("./controllers/users");
const {
  validateLogin,
  validateCreateUser,
} = require("./middlewares/validators");
const errorHandler = require("./middlewares/error-handler");

const {
  PORT = 3000,
  MONGO_URL = "mongodb://127.0.0.1:27017/web-almoxarifado",
} = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(cors());
app.use(express.json());

app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);

app.get("/", (req, res) => {
  res.send({ message: "Web Almoxarifado API" });
});

app.use(auth);

app.get("/users/me", getCurrentUser);
app.use("/items", itemsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado nao encontrado" });
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
