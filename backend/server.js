const express = require("express");
const notes = require("./data/notes");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
const dotenv = require("dotenv").config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is home");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server started on port ${port}`));
