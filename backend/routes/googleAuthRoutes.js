const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/callback", passport.authenticate("google", {
  failureRedirect: "http://localhost:5173/login",
}), (req, res) => {
  res.redirect("http://localhost:5173/dashboard");
});

module.exports = router;
