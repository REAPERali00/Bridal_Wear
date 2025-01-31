require("dotenv").config();
const MongoBackend = require("../DB/database");
const db = new MongoBackend(process.env.URL, process.env.DB, "colors");

let colorsData = [];

async function addColor(color) {
  try {
    color = "#" + color;
    colorsData.push(color);
    await db.connect();
    await db.addColor(color);
  } catch (e) {
    console.error("Could not add the color: " + e);
  } finally {
    await db.disconnect();
  }
}

function removeArrayColor(item) {
  const index = colorsData.findIndex((element) => element === item);
  if (index !== -1) {
    colorsData.splice(index, 1);
  } else {
    console.log("Array Color not found to remove ", item);
  }
}

async function removeColor(color) {
  try {
    await db.connect();
    await db.removeColor(color);
    removeArrayColor(color);
  } catch (e) {
    console.error("Could not remove the color: " + e);
  } finally {
    await db.disconnect();
  }
}

async function getColors() {
  let colors = [];
  try {
    if (colorsData.length === 0) {
      await db.connect();
      colors = await db.getColors();
      colorsData = colors.map((doc) => doc.color);
      console.log(colorsData);
    }
  } catch (e) {
    console.error("Could not receive the colors: " + e);
  } finally {
    await db.disconnect();
  }
  return colorsData;
}

module.exports = { getColors, removeColor, addColor, colorsData };
