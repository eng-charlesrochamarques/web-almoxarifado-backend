const Item = require("../models/item");
const NotFoundError = require("../errors/not-found-error");

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
    .catch(next);
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
    .catch(next);
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
    .catch(next);
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
