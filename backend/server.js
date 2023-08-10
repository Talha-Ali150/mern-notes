const express = require("express");
const notes = require("./data/notes");
const app = express();
const dotenv = require("dotenv").config();

app.get("/", (req, res) => {
  res.send("this is home");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === req.params.id);
  res.json(note);
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server started on port ${port}`));
