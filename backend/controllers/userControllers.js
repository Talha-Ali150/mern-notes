const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).send("An error occurred while creating the user");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("error aya ");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).send("Invalid Email or Password");
    }
  } catch (e) {
    res.status(500).send("An error occured");
  }
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({
        error: "user not found",
      });
    }
  } catch (e) {
    res.json({ error: e });
  }
};
// const updateProfile = async (req, res) => {
//   const { title, content } = req.body;

//   try {
//     const note = await Note.findById(req.params.id);

//     if (note) {
//       if (note.user.toString() !== req.user.id) {
//         res.status(403).json({ message: "You can't perform this action" });
//       } else if (note.user.toString() === req.user.id) {
//         note.title = title;
//         note.content = content;
//         const updatedNote = await note.save();
//         res.status(200).json(updatedNote);
//       }
//     } else {
//       res.status(404).json({ message: "note not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred" });
//   }
// };
module.exports = { registerUser, loginUser, updateProfile };
