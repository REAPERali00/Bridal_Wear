const express = require("express");
const fs = require("fs");

const router = express.Router();
var data = require("../data.json");

router.use(express.text());
router.use(express.json());

function removeItem(item) {
  const index = data.color.findIndex((element) => element === item);
  if (index !== -1) {
    data.color.splice(index, 1);
  } else {
    console.log("Color not found to remove ", item);
  }
}

function removeColor(color) {
  console.log("Removing Color...");
  removeItem(color);
  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    console.log("write finished", err);
  });
}

function addColor(color) {
  data.color.push("#" + color);
  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    console.log("write finished", err);
  });
}

// addColor("BB3333");
router.get("/", (req, res) => {
  console.log("Receiving Colors");
  res.json(data);
});

router.post("/", (req, res) => {
  const color = req.body;
  console.log("Posting Colors", color);
  addColor(color);
  res.send("Added Color Successfully");
});

router.post("/delete", (req, res) => {
  const color = req.body;
  console.log("Deleting Colors", color);
  removeColor(color);
  res.send("Removed Color Successfully");
});

module.exports = router;
