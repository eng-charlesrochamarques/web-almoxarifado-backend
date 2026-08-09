const router = require("express").Router();

const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");

const {
  validateItemId,
  validateCreateItem,
  validateUpdateItem,
} = require("../middlewares/validators");

router.get("/", getItems);
router.post("/", validateCreateItem, createItem);
router.patch("/:itemId", validateUpdateItem, updateItem);
router.delete("/:itemId", validateItemId, deleteItem);

module.exports = router;
