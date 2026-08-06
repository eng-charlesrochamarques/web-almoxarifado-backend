const router = require("express").Router();

const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");

router.get("/", getItems);
router.post("/", createItem);
router.patch("/:itemId", updateItem);
router.delete("/:itemId", deleteItem);

module.exports = router;
