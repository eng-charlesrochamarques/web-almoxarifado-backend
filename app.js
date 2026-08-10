require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const routes = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const {
  PORT = 3000,
  MONGO_URL = "mongodb://127.0.0.1:27017/web-almoxarifado",
} = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(routes);

app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado nao encontrado" });
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
