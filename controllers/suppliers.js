const BadRequestError = require("../errors/bad-request-error");
const { searchTmeProducts } = require("../utils/tme-api");

function searchTmeSupplier(req, res, next) {
  const { query } = req.query;

  if (!query) {
    return next(new BadRequestError("Informe um termo de busca"));
  }

  return searchTmeProducts(query)
    .then((items) => res.send({ items }))
    .catch(next);
}

module.exports = {
  searchTmeSupplier,
};
