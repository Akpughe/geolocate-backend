const Property = require('../model/Property');
const axios = require('axios');
const { GOOGLE_GEOCODE_API } = require('../config/constants');

exports.createProperty = async (req, res) => {
  const {
    price,
    homeType,
    bedroom,
    bathroom,
    sqft,
    description,
    address,
  } = req.body;

  try {
    let property = await Property.find();

    // if (property) {
    //   return res.status(400).json({
    //     errors: [{ message: 'Property user already exists' }],
    //   });
    // }

    const { data: addressDetails } = await axios.get(
      `${GOOGLE_GEOCODE_API}&place_id=${address.placeId}`
    );

    property = new Property({
      price,
      homeType,
      bedroom,
      bathroom,
      sqft,
      description,
      address,
      location: {
        type: 'Point',
        coordinates: [
          addressDetails?.results[0]?.geometry?.location?.lng,
          addressDetails?.results[0]?.geometry?.location?.lat,
        ],
      },
    });

    await property.save();

    res.status(201).json({
      message: 'Property added successfully',
      property: property,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      properties,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

exports.searchProperty = async (req, res) => {
  const { longitude, latitude, q } = req.query;
  // const { name } = address;
  const keyword = req.query.q
    ? {
        'address.name': { $regex: q, $options: 'i' },
      }
    : {};

  let places;

  try {
    // const props = await Property.find({
    //   ...keyword,
    // });
    // Property.ensureIndex({ location: '2dsphere' });

    //query DB with object and sort
    places = await Property.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [
              Number.parseFloat(longitude),
              Number.parseFloat(latitude),
            ],
          },
          distanceField: 'distance',
          query: {
            ...keyword,
          },
        },
      },
      {
        $sort: {
          distance: 1,
        },
      },
    ]);
    // res.status(200).json(props);
    res.status(200).json(places);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        errors: [{ message: 'Property not found' }],
      });
    }

    res.status(200).json(property);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
