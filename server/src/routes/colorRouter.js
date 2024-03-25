const express = require("express");
const router = express.Router();

// router.use(express.text());
router.use(express.json());

const {
  getColors,
  removeColor,
  addColor,
  colorsData,
} = require("../controllers/colorController");
getColors();

// addColor("BB3333");
router.get("/", async (req, res) => {
  console.log("Receiving Colors...");
  try {
    const colors = await getColors();
    res.json(colors);
  } catch (err) {
    res.status(500).send("An error occurred while getting the Colors.");
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { color } = req.body;
    if (!color) {
      res.status(400).send("Color not provided");
      return;
    }
    console.log("Posting Colors: ", color);
    await addColor(color);
    res.json({ message: "Color submitted successfully" });
  } catch (err) {
    res.status(500).send("An error occurred while submitting the color." + err);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { color } = req.body;
    if (!color) {
      res.status(400).send("Color not provided");
      return;
    }
    console.log("Deleting Colors", color);
    await removeColor(color);
    res.send("Removed Color Successfully");
  } catch (err) {
    res.status(500).send("An error occurred while removing the color." + err);
  }
});

module.exports = router;
