const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://bridal-wear-frontend-react.vercel.app/",
  })
);

const colorRouter = require("./routes/colorRouter");
app.use("/color", colorRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
