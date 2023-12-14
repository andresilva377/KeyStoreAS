const Review = mongoose.model('Review', {
  gameid: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  userEmail: { type: mongoose.Schema.Types.ObjectId , ref: 'User' },  
  rating: Number,
  comment: String,
  });

  module.exports = Review;