const Product = require('../models/product');

module.exports.index = async (req, res) => {
  try {
    const product = await Product.find();
    const disposePage = 'Dispose Page';
    res.render('dispose/index', { product });
  } catch (err) {
    console.error(err.message);
  }
};
