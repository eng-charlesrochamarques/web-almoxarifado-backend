const router = require("express").Router();

const auth = require("../middlewares/auth");
const itemsRouter = require("./items");
const suppliersRouter = require("./suppliers");

const { login, createUser, getCurrentUser } = require("../controllers/users");
const {
  validateLogin,
  validateCreateUser,
} = require("../middlewares/validators");

router.post("/signin", validateLogin, login);
router.post("/signup", validateCreateUser, createUser);

router.get("/", (req, res) => {
  res.send({ message: "Web Almoxarifado API" });
});

router.use(auth);

router.get("/users/me", getCurrentUser);
router.use("/items", itemsRouter);
router.use("/api/suppliers", suppliersRouter);

module.exports = router;
