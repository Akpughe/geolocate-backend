const express = require('express');

const Property = require('../model/Property');

const propertyController = require('../controller/property');

const router = express.Router();

router.get('/search-property', propertyController.searchProperty);

router.get('/get-property', propertyController.getProperties);

router.post('/create-property', propertyController.createProperty);

router.get('/get-property/:id', propertyController.getPropertyById);

module.exports = router;