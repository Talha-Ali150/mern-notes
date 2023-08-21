const express = require("express");
const {
  getNotes,
  createNote,
  getNoteByID,
  updateNote,
  deleteNote,
} = require("../controllers/noteControllers");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(protect, getNoteByID)
  .put(protect, updateNote)
  .delete(protect, deleteNote);
module.exports = router;
