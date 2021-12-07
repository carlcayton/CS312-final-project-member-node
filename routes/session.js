const router = require("express").Router();
const { json } = require("body-parser");
const db = require("../services/db.js");
var path = require("path")
const express = require("express");
const app = express();
app.use(express.static("../public"))

router.post("/attempt", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  db.query("SELECT * FROM user WHERE `username`=? AND `password`=?", [
    username,
    password,
  ]).then((results) => {
    const test = results[0];
    if (
      req.body.username === test.username &&
      req.body.password === test.password
    ) {
      session = req.session;
      session.userid = username;
      res.send(
        `Hey there, welcome ${session.userid} <a href=\'/session/logout'>click to logout</a>`
      );
    } else {
      res.send("Invalid username or password");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/login", (req, res) => {
  if (req.session.userid) {
    res.redirect("/");
  } else {
    res.sendFile(path.resolve("public/login.html"))
  }
});

module.exports = router;
