const router = require("express").Router();
const PromoCode = require("../models/PromoCode");

// CREATE
router.post("/", async (req, res) => {
  const newPromoCode = new PromoCode(req.body);
  try {
    const savedPromoCode = await newPromoCode.save();
    res.status(201).json(savedPromoCode);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.post("/update", async (req, res) => {
  try {
    const updatedCart = await PromoCode.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await PromoCode.findByIdAndDelete(req.params.id);
    res.status(201).json("Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Cart
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await PromoCode.findOne({ userId: req.params.userId });
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/findAll", async (req, res) => {
  try {
    const carts = await PromoCode.find({});
    res.status(201).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
