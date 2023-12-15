const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for product operations
router.post('/create', productController.createGame);
router.get('/get/:id', productController.getgGame);
router.put('/edit/:id', productController.editGame);
router.delete('/delete/:id', productController.deleteGame);

module.exports = router;