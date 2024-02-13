const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

router.get("/", (req, res) => {
  res.json("auth route found");
});

router.post("/register", async (req, res) => {
  const newUser = new User({
    phone: req.body.phone,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.json(201, savedUser);
    console.log("user added");
  } catch (err) {
    res.json(500, "Failed to authenticate user. Error is : " + err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });
    if (!user) {
      res.send(400, "Wrong credentials");
    } else {
      const Originalpassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      ).toString(CryptoJS.enc.Utf8);

      const { password, ...others } = user._doc;
      Originalpassword === req.body.password
        ? res.json(201, { ...others })
        : res.json(401, "Wrong Password");
    }
  } catch (err) {
    res.json(500, "Failed to authenticate user. Error is : " + err);
  }
});

module.exports = router;
