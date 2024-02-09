const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    discount: { type: String, required: true },
    image: { type: Object, required: true },
    size: { type: Array, required: true },
    color: { type: Array, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, default: false },
    shippingCharge: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
