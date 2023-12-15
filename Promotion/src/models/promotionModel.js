const Promotion = mongoose.model('Promotion', {
  
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    discountPercentage: Number,
    startDate: Date,
    endDate: Date,

});

module.exports = Promotion;