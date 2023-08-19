const express = require("express");
const { getNotes, createNote } = require("../controllers/noteControllers");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
// router.route('/:id').get().put().delete()
module.exports = router;
