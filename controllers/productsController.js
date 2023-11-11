const Product = require('../models/product');
const { cloudinary } = require('../cloudinary');
const User = require('../models/user');
const { ObjectId } = require('mongoose').Types;
const path = require('path');

module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({});

    // const producttext = 'hello its products';
    res.render('products/index', { products });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports.renderNewForm = (req, res) => {
  const myform = 'myform';
  res.render('products/new', {
    myform,
  });
};

module.exports.createProduct = async (req, res, next) => {
  try {
    if (req.body.product.latitude === null || req.body.product.longitude === null || req.body.product.latitude === '' || req.body.product.longitude === '' || isNaN(req.body.product.latitude) || isNaN(req.body.product.longitude)) {
      // req.flash('error', 'Please enable geolocation to provide accurate location.');
      return res.redirect('/products/new');
    }

    const unprocessedBody = {
      deviceStatus: req.body.product.deviceStatus,
      location: {
        type: 'Point',
        coordinates: [req.body.product.longitude, req.body.product.latitude],
      },
      deviceType: req.body.product.deviceType,
      description: req.body.product.description,
    };
    console.log(unprocessedBody);

    const product = new Product(unprocessedBody);

    // assign images to the new product
    product.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));

    // asign current user as author
    product.author = req.user._id;

    // Save the product to the database
    await product.save();

    res.redirect(`/products/${product._id}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports.showProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product with the provided ID and populate author
    const product = await Product.findById(productId).populate('author');

    // Check if the product is found
    if (!product) {
      return res.redirect('/products');
    }

    res.render('products/show', {
      product,
    });
  } catch (error) {
    console.error('Error retrieving device:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
