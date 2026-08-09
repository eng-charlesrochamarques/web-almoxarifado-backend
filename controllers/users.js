const bcrypt = require("bcryptjs");

const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;

      res.status(201).send(userObject);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("Email ja cadastrado"));
      }

      if (err.name === "ValidationError") {
        return next(new BadRequestError("Dados invalidos para criar usuario"));
      }

      return next(err);
    });
}

module.exports = {
  createUser,
};
