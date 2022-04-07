const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());
const variableRoutes = require("./routes/variableRoute");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", variableRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running",
  });
});

app.listen(process.env.PORT, () =>
  console.log("Server is running on 8000 port")
);
