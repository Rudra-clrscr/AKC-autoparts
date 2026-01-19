const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: String,

    customerName: String,
    address: String,
    city: String,
    state: String,
    phone: String,
    pin: String,

    totalPrice: Number,

    paymentMethod: String,
    paymentStatus: String,

    status: {
      type: String,
      default: "Pending"
    },

    items: [
      {
        id: String,
        name: String,
        qty: Number,
        price: Number
      }
    ]
  },
  {
    timestamps: true   // ⭐ MOST IMPORTANT
  }
);

module.exports = mongoose.model("Order", orderSchema);
