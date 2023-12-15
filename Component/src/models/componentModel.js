const mongoose = require("mongoose");

const Component = mongoose.model("component", {
  ram: { type: Number } ,
  cpuModel: String,
  gpuModel: String,
  ostype: String
});

module.exports = User;
