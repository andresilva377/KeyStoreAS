const mongoose = require("mongoose");

const Game = mongoose.model("game", {
  title: String,
  price: Schema.Types.Decimal128,
  genre: String,
  stock: { type: Number },
  quantity: { type: Number },
  ram: { type: Number } ,
  cpuModel: String,
  gpuModel: String,
  ostype: String
});

module.exports = Game;