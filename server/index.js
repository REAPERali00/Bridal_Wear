const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// const colorRouter = require("./routes/colorRouter");
// app.use("/color", colorRouter);

// app.post("/cart", (req, res) => {
//   const cartItem = req.body;
//   console.log("Pushing new cart item to data base");
//   console.log(cartItem);
//   run(cartItem);
//   res.send("Added Item Successfully");
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
