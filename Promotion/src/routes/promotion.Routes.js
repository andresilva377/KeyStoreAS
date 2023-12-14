const express = require("express");
const router = express.Router();

const PromotionController = require("../controllers/promotionController");


// Route to create a new promotion
router.post('/promotions/createPromotion', promotionController.createPromotion);

// Route to get promotions
router.get('/promotions/getPromotion', promotionController.getPromotions);

// Route to validate a promotion for a specific game
router.get('/promotions/validatePromotion/:gameId', promotionController.validatePromotion);
module.exports = router;
