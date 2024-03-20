const MongoBackend = require("../DB/database");
const db = new MongoBackend(process.env.URL, process.env.DB, "colors");

async function addColor(color) {
  try {
    await db.connect();
    await db.insertRanking(color);
  } catch (e) {
    console.error("Could not add the color: " + e);
  } finally {
    await db.disconnect();
  }
}

async function removeColor(color) {
  try {
    await db.connect();
    await db.removeColor(color);
  } catch (e) {
    console.error("Could not remove the color: " + e);
  } finally {
    await db.disconnect();
  }
}

async function getColors() {
  let colors = [];
  try {
    await db.connect();
    colors = await db.getColors();
  } catch (e) {
    console.error("Could not receive the colors: " + e);
  } finally {
    await db.disconnect();
  }
  return colors;
}

module.exports = { getColors, removeColor, addColor };
