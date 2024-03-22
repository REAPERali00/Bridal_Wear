const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();

const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "https://bridal-wear-frontend-react.vercel.app",
  ],
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use(
//   cors({
//     origin: "https://bridal-wear-frontend-react.vercel.app/",
//   })
// );

const colorRouter = require("./routes/colorRouter");
app.use("/color", colorRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
