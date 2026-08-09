const Item = require("../models/item");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

function getItems(req, res, next) {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
}

function createItem(req, res, next) {
  const {
    name,
    category,
    partNumber,
    manufacturer,
    location,
    quantity,
    minQuantity,
    lastPrice,
    currency,
    imageUrl,
  } = req.body;

  Item.create({
    name,
    category,
    partNumber,
    manufacturer,
    location,
    quantity,
    minQuantity,
    lastPrice,
    currency,
    imageUrl,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Dados invalidos para criar item"));
      }

      return next(err);
    });
}

function updateItem(req, res, next) {
  const { itemId } = req.params;

  Item.findByIdAndUpdate(itemId, req.body, {
    new: true,
    runValidators: true,
  })
    .then((item) => {
      if (!item) {
        return next(new NotFoundError(`Item ${itemId} nao encontrado`));
      }

      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError("Dados invalidos para atualizar item"));
      }

      return next(err);
    });
}

function deleteItem(req, res, next) {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError(`Item ${itemId} nao encontrado`));
      }

      return res.send({ message: "Item removido com sucesso" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de item invalido"));
      }

      return next(err);
    });
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
