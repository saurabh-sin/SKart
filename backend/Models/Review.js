const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, required: true },

    reviews: [
      {
        title: {
          type: String,
          trim: true,
        },
        review: {
          type: String,
          trim: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        star: {
          type: Number,
          min: 1,
          max: 5,
          default: 4,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
