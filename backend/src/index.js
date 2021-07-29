const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const routes = require("./routes/index");
const { connectDB } = require("./config/connectDB");

connectDB();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", routes);

app.use((req, res, next) => {
  let error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else if (err.message) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
    });
  } else {
    res.status(500).json({ message: "Something looks wrong :( !!!" });
  }
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port 3030`)
);

// app.use("/", (req, res) => {
//   res.send("Hello World");
// });
