const { celebrate, Joi } = require("celebrate");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().pattern(objectIdPattern).required(),
  }),
});

const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(80).required(),
    category: Joi.string().min(2).max(60).required(),
    partNumber: Joi.string().min(2).max(80).required(),
    manufacturer: Joi.string().min(2).max(80).required(),
    location: Joi.string().min(2).max(80).required(),
    quantity: Joi.number().min(0).required(),
    minQuantity: Joi.number().min(0).required(),
    lastPrice: Joi.number().min(0),
    currency: Joi.string().valid("BRL", "USD", "EUR"),
    imageUrl: Joi.string().allow(""),
  }),
});

const validateUpdateItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().pattern(objectIdPattern).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(80),
    category: Joi.string().min(2).max(60),
    partNumber: Joi.string().min(2).max(80),
    manufacturer: Joi.string().min(2).max(80),
    location: Joi.string().min(2).max(80),
    quantity: Joi.number().min(0),
    minQuantity: Joi.number().min(0),
    lastPrice: Joi.number().min(0),
    currency: Joi.string().valid("BRL", "USD", "EUR"),
    imageUrl: Joi.string().allow(""),
  }),
});

module.exports = {
  validateItemId,
  validateCreateItem,
  validateUpdateItem,
};
