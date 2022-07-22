const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require("./Role");

const UserSchema = new mongoose.Schema({
  fullname: {
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
    required: true,
  },
  profilePicture: {
    public_id: {
      type: String,
    },
    fileName: {
      type: String,
    },
    url: {
      type: String,
    },
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
