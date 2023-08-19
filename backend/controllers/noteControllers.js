const Note = require("../models/noteModel");

const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: "please fill all the fields" });
  } else {
    try {
      const note = new Note({ user: req.user.id, title, content });
      const createdNote = await note.save();
      res.status(201).json(createdNote);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "failed to create note" });
    }
  }
};
module.exports = { getNotes, createNote };
