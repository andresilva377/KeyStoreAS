const Shop = mongoose.model('Shop', {
    gameid: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    userEmail: { type: mongoose.Schema.Types.ObjectId , ref: 'User' },  
    data: Date,
    });
  
module.exports = Shop;