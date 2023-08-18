const express = require("express");
const { getNotes } = require("../controllers/noteControllers");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(protect, getNotes);
// router.route('/create').post()
// router.route('/:id').get().put().delete()
module.exports = router;
