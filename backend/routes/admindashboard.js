const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const Order = require('../models/order');

router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const delivered = await Order.countDocuments({ status: "Delivered" });
    const cancelled = await Order.countDocuments({ status: "Cancelled" });
    const pending = await Order.countDocuments({ status: "Pending" });
    const packed = await Order.countDocuments({ status: "Packed" });

    const deliveredOrders = await Order.find({ status: "Delivered" });
    const totalRevenue = deliveredOrders.reduce(
      (sum, o) => sum + o.totalPrice,
      0
    );

    res.render('admin/dashboard', {
      totalOrders,
      delivered,
      cancelled,
      pending,
      packed,
      totalRevenue
    });

  } catch (err) {
    console.error(err);
    res.render('admin/dashboard', {
      totalOrders: 0,
      delivered: 0,
      cancelled: 0,
      pending: 0,
      packed: 0,
      totalRevenue: 0
    });
  }
});

module.exports = router;
