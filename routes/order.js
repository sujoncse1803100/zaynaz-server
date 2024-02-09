const router = require("express").Router();
const Order = require("../models/Order");

// CREATE
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err._message);
  }
});

//UPDATE
router.post("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(201).json("Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Order
router.get("/find/:userId", async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/findAll", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(201).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
