require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/", express.static("public"));

const db = mongoose.connection;

db.on("error", err => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const graduatesRouter = require("./routes/graduates");

app.use("/api/graduates", graduatesRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
