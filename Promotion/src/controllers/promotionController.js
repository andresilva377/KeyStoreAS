require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Review = require("../models/reviewModel");


// Function to create a new promotion
exports.createPromotion = async (req, res) => {
      try {
        const { gameId, discountPercentage, startDate, endDate } = req.body;

        // Check if the game with the provided ID exists
        const game = await Game.findById(gameId);
        if (!game) {
          return res.status(404).send('Game not found');
        }

        // Create the promotion
        const promotion = new Promotion({ gameId, discountPercentage, startDate, endDate });
        await promotion.save();

        res.status(201).json(promotion);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  };

// Function to get promotions
exports.getPromotion = async (req, res) => {
    try {
      const promotions = await Promotion.find().populate('gameId', 'name');

      // Calculate and add discounted value to each promotion
      const currentDate = new Date();
      const promotionsWithDiscount = promotions.map(async (promotion) => {
        const discountedGame = await calculateDiscountedValue(promotion.gameId.age, promotion.discountPercentage);
        return { ...promotion.toObject(), discountedValue: discountedGame };
      });

      // Wait for all calculations to complete
      const results = await Promise.all(promotionsWithDiscount);

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
};


// Function to validate a promotion
exports.validatePromotion = async (req, res) => {
      try {
        const gameId = req.params.gameId;

        // Check if the game with the provided ID exists
        const game = await Game.findById(gameId);
        if (!game) {
          return res.status(404).send('Game not found');
        }

        // Check if there is an active promotion for the game
        const currentDate = new Date();
        const promotion = await Promotion.findOne({
          gameId,
          startDate: { $lte: currentDate },
          endDate: { $gte: currentDate },
        });

        // Calculate and add discounted value to the promotion
        const discountedValue = promotion
          ? await calculateDiscountedValue(game.age, promotion.discountPercentage)
          : null;

        res.json({ isValid: !!promotion, promotion: { ...promotion.toObject(), discountedValue } });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }

        // Function to apply discount to the original value
        const calculateDiscountedValue = async (originalValue, discountPercentage) => {
        const discountFactor = 1 - discountPercentage / 100;
        const discountedValue = originalValue * discountFactor;
        return discountedValue;

      };
};



