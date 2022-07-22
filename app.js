const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const locationRouter = require("./routes/property");

connectDB();

app.use(cors());

app.use(express.json({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => res.send("API Running..."));

app.use("/api", locationRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});