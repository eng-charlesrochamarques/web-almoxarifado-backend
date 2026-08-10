const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 80,
    },
    category: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 60,
    },
    partNumber: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 80,
    },
    manufacturer: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 80,
    },
    location: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 80,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    minQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    lastPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: "EUR",
      enum: ["BRL", "USD", "EUR"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("item", itemSchema);
