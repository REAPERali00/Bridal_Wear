const MongoBackend = require("../DB/database");
const fs = require("fs");
var data = require("../data.json");
const db = new MongoBackend();

async function addColor(color) {
  try {
    await db.connect();
    await db.insertRanking(color);
    // const rankings = await db.getColors();
    // console.log(rankings);
  } catch (e) {
    console.error("could not add the color the color: " + e);
  } finally {
    await db.disconnect();
  }
}

async function removeColor(color) {
  try {
    await db.connect();
    await db.removeColor(color);
    // const rankings = await db.getColors();
    // console.log(rankings);
  } catch (e) {
    console.error("could not remove the color the color: " + e);
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
    console.error("could not receive the colors: " + e);
  } finally {
    await db.disconnect();
  }
  return colors;
}
module.exports = { getColors, removeColor, addColor };
