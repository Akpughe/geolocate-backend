const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new mongoose.Schema(
  {
    price: {
      type: String,
      required: true,
    },
    homeType: {
      type: String,
      required: true,
    },
    bedroom: {
      type: String,
      required: true,
    },
    bathroom: {
      type: String,
      required: true,
    },
    sqft: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // title: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    location: {
      type: {
        type: String,
        required: true,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: [
        {
          type: Number,
          required: true,
        },
      ],
    },
    address: {
      name: {
        type: String,
        required: true,
      },
      placeId: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Property = mongoose.model('property', PropertySchema);
