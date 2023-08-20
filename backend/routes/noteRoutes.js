const express = require("express");
const {
  getNotes,
  createNote,
  getNoteByID,
  updateNote,
} = require("../controllers/noteControllers");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router.route("/:id").get(protect, getNoteByID).put(protect, updateNote);
// .put().delete()
module.exports = router;
