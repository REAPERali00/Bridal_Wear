const express = require("express");
const fs = require("fs");
const app = express();
var data = require("./data.json");
const MongoBackend = require("./DB/MongoBackend");
const mongoBackend = new MongoBackend();

app.use(express.text());
app.use(express.json());
async function run(item) {
  return mongoBackend.run(item);
}

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
// addColor("#BB3333");
app.get("/color", (req, res) => {
  console.log("Receiving Colors");
  res.json(data);
});

app.post("/color", (req, res) => {
  const color = req.body;
  console.log("Posting Colors", color);
  addColor(color);
  res.send("Added Color Successfully");
});

app.post("/color/delete", (req, res) => {
  const color = req.body;
  console.log("Deleting Colors", color);
  removeColor(color);
  res.send("Removed Color Successfully");
});

app.post("/cart", (req, res) => {
  const cartItem = req.body;
  console.log("Pushing new cart item to data base");
  console.log(cartItem);
  run(cartItem);
  res.send("Added Item Successfully");
});
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
