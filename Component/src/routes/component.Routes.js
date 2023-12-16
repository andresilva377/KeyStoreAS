const express = require("express");
const router = express.Router();
const componentController = require("./componentController"); // Update the path accordingly

// Route to edit a component
router.put("/components/:id", componentController.editComponent);

// Route to add a new component
router.post("/components", componentController.addComponent);

// Route to delete a component
router.delete("/components/:id", componentController.deleteComponent);

module.exports = router;