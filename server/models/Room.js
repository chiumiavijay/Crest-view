
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // store path like 'images/room1.jpg'
});

module.exports = mongoose.model("Room", RoomSchema);
