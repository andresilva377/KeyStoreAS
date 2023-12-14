const Review = mongoose.model('Review', {
  
      gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
      discountPercentage: Number,
      startDate: Date,
      endDate: Date,

  });

  module.exports = Review;