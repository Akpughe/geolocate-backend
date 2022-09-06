const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require("./Role");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  addresses: [
    {
      address: {
        type: String,
        required: true,
      },
      placeId: {
        type: String,
        required: false,
      },
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
