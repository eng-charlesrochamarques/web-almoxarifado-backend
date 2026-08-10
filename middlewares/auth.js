const jwt = require("jsonwebtoken");

const UnauthorizedError = require("../errors/unauthorized-error");

function auth(req, res, next) {
  const { authorization } = req.headers;
  const { JWT_SECRET = "dev-secret-web-almoxarifado" } = process.env;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Autorizacao necessaria"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Autorizacao necessaria"));
  }

  req.user = payload;

  return next();
}

module.exports = auth;
