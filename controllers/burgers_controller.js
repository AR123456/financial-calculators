const express = require("express");
const router = express.Router();
const burgers = require("../models/burger.js");

router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  burgers.all(function(data) {
    let hbsObject = { burgers: data };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers/create", function(req, res) {
  burgers.create(["name"], [req.body.name], function(data) {
    res.redirect("/burgers");
  });
});

router.put("/burgers/update/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition ", condition);

  burgers.update({ devoured: req.body.devoured }, condition, function(data) {
    res.redirect("/burgers");
  });
});

module.exports = router;
