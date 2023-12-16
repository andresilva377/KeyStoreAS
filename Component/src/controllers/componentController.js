require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Review = require("../models/componentModel");


//edit a component by its ID
exports.editComponent = async (req, res) => {
    const componentId = req.params.id;
    const { ram, cpuModel, gpuModel, ostype } = req.body;

  try {
    const updatedComponent = await Component.findByIdAndUpdate(
      componentId,
      { ram, cpuModel, gpuModel, ostype },
      { new: true }
    );

    if (!updatedComponent) {
      return res.status(404).json({ error: "Component not found" });
    }

    res.status(200).json(updatedComponent);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//add new component
exports.addComponent = async (req, res) => {
    const { ram, cpuModel, gpuModel, ostype } = req.body;

    try {
      const newComponent = new Component({
        ram,
        cpuModel,
        gpuModel,
        ostype
      });
  
      const savedComponent = await newComponent.save();
      res.status(201).json(savedComponent);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
};

//deleteComponent
exports.deleteComponent = async (req, res) => {
    const componentId = req.params.id;

  try {
    const deletedComponent = await Component.findByIdAndDelete(componentId);

    if (!deletedComponent) {
      return res.status(404).json({ error: "Component not found" });
    }

    res.status(200).json({ message: "Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
 
};
