const fs = require("fs");
var data = require("../data.json");

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

module.exports = { removeItem, removeColor, addColor };
