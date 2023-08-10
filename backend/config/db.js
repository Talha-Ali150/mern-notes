const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DataBase connected: ${connection.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
