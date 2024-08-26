const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017/listTodo")
      .then(() => console.log("Connected!"));
  } catch (error) {
    console.log("connect failed", error);
  }
};

module.exports = connectDb;
