const Property = require('../model/Property');
const axios = require('axios');
const { GOOGLE_GEOCODE_API } = require('../config/constants');

exports.createProperty = async (req, res) => {
  const { title, address } = req.body;

  try {
    let property = await Property.findOne({ title });

    if (property) {
      return res.status(400).json({
        errors: [{ message: 'Property user already exists' }],
      });
    }

    const { data: addressDetails } = await axios.get(
      `${GOOGLE_GEOCODE_API}&place_id=${address.placeId}`
    );

    property = new Property({
      title,
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
    console.log(err);
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
  // const { title } = req.query;

  let props;
  // if (!title) {
  //   return res
  //     .status(400)
  //     .json({ errors: [{ message: 'title not specified' }] });
  // }
  try {
    const keyword = req.query.q
      ? {
          title: {
            $regex: req.query.q,
            $options: 'i',
          },
        }
      : {};

    const props = await Property.find({ ...keyword });
    // Property.ensureIndex({ location: '2dsphere' });

    // //query DB with object and sort
    // props = await Property.aggregate([
    //   {
    //     $geoNear: {
    //       near: {
    //         type: 'Point',
    //         coordinates: [
    //           Number.parseFloat(longitude),
    //           Number.parseFloat(latitude),
    //         ],
    //       },
    //       distanceField: 'distance',
    //       query: {
    //         ...options,
    //       },
    //     },
    //   },
    //   {
    //     $sort: {
    //       distance: 1,
    //     },
    //   },
    // ]);
    res.status(200).json(props);
  } catch (err) {
    console.log(err.message);
  }
};
