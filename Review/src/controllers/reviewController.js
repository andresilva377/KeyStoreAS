require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
    try {
      const { gameName, userEmail, rating, comment } = req.body;

      // Check if the user with the provided email exists
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Check if the game with the provided name exists
      const game = await Game.findOne({ name: gameid });
      if (!game) {
        return res.status(404).send('Game not found');
      }

      // Create the review with the game name
      const review = new Review({ game: gameid, userEmail, rating, comment });
      await review.save();

      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } 
  };

exports.getReview = async (req, res) => {
    try {
      const userEmail = req.params.userEmail;

      // Check if the user with the provided email exists
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Get the reviews associated with the user's email
      const reviews = await Review.find({ userEmail }).populate('game', 'name');

      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  };

  // Function to edit an existing review
exports.editReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;

    // Check if the review with the provided ID exists
    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).send('Review not found');
    }

    // Update the review fields
    existingReview.rating = rating;
    existingReview.comment = comment;

    // Save the changes
    await existingReview.save();

    res.json(existingReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

// Function to delete an existing review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Check if the review with the provided ID exists
    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).send('Review not found');
    }

    // Remove the review
    await existingReview.remove();

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
