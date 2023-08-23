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

const getNoteByID = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.status(201).json(note);
    } else {
      res.status(500).json({ message: "note not found" });
    }
  } catch (e) {
    res.status(500).json({ error: "an error occured" });
  }
};

const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.findById(req.params.id);

    if (note) {
      if (note.user.toString() !== req.user.id) {
        res.status(403).json({ message: "You can't perform this action" });
      } else if (note.user.toString() === req.user.id) {
        note.title = title;
        note.content = content;
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
      }
    } else {
      res.status(404).json({ message: "note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can't perform this action" });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Note deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { getNotes, createNote, getNoteByID, updateNote, deleteNote };
