const router = require("express").Router();

const { searchTmeSupplier } = require("../controllers/suppliers");

router.get("/tme/search", searchTmeSupplier);

module.exports = router;
