const mongoose = require("mongoose");

const PromoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    id: { type: Number, required: true },
    usages: { type: Number, required: true },
    discount: { type: Number, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    status: { type: String, default: "Deactive" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PromoCode", PromoCodeSchema);
