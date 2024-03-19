const express = require("express");
const router = express.Router();
var data = require("../data.json");

router.use(express.text());
router.use(express.json());

const {
  getColors,
  removeColor,
  addColor,
} = require("../controllers/colorController");

// addColor("BB3333");
router.get("/", async (req, res) => {
  console.log("Receiving Colors...");
  try {
    const rankings = await getRankings();
    res.json(rankings);
  } catch (err) {
    res.status(500).send("An error occurred while getting the rankings.");
  }
});

router.post("/", async (req, res) => {
  const color = req.body;
  console.log("Posting Colors", color);
  addColor(color);
  res.send("Added Color Successfully");

  console.log("Posting Colors: ", color);
  try {
    const color = req.body;
    await addOrUpdateRanking(newRank.name, newRank.time);
    res.json({ message: "Ranking submitted successfully" });
  } catch (err) {
    res
      .status(500)
      .send("An error occurred while submitting the ranking." + err);
  }
});

router.post("/delete", (req, res) => {
  const color = req.body;
  console.log("Deleting Colors", color);
  removeColor(color);
  res.send("Removed Color Successfully");
});

module.exports = router;
