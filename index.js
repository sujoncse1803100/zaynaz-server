const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const promocodeRoute = require("./routes/promocode");

const MongoDB_URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.ohtj23d.mongodb.net/`;

mongoose.connect(
  MongoDB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB Conected");
  }
);

app.get("/", (req, res) => {
  res.status(200).send("welcome to server");
});

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/promocode", promocodeRoute);
app.use("/api/order", orderRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("backend server is running at http://localhost:" + port);
});
