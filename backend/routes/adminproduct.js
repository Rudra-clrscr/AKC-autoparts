const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { getProducts } = require('../models/productData');

router.get('/products', adminAuth, async (req, res) => {
  const products = await getProducts();
  res.render('admin/products', { products });
});

module.exports = router;
