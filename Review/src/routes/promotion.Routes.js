const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

// Routes

// Route to create a new review
router.post("/review/createReview", reviewController.createReview);

// Route to edit an existing review
router.put("/reviews/editReview/:reviewId", reviewController.editReview);

// Route to get reviews for a specific user
router.get("/reviews/user/getReview/:userEmail", reviewController.getReview);

// Route to delete an existing review
router.delete("/reviews/deleteReview/:reviewId", reviewController.deleteReview);

module.exports = router;
