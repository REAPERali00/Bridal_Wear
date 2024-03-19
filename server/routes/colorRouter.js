const express = require("express");
const router = express.Router();
var data = require("../data.json");

router.use(express.text());
router.use(express.json());

const {
  removeItem,
  removeColor,
  addColor,
} = require("../controllers/colorController");

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
