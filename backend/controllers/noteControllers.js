const Note = require("../models/noteModel");

const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};

module.exports = { getNotes };
