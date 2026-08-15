const router = require("express").Router();

const { createUser } = require("../controllers/users");
const { validateCreateUser } = require("../middlewares/validators");

router.post("/", validateCreateUser, createUser);

module.exports = router;
