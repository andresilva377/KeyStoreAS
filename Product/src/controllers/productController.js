// Imports
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// Models
const Game = require("../models/productModel");
const { Decimal128 } = require('mongoose').Schema.Types;

// Create a game
exports.createGame = async (req, res) => {
    try {
        const {
          title,
          price,
          genre,
          stock,
          quantity,
          ram,
          cpuModel,
          gpuModel,
          ostype
        } = req.body;
    
        const newGame = new Game({
          title,
          price: Decimal128.fromString(price),
          genre,
          stock,
          quantity,
          ram,
          cpuModel,
          gpuModel,
          ostype
        });
    
        await newGame.save();
        res.status(201).json(newGame);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

exports.getGame = async (req, res) => {
    try {
        const gameId = req.params.id;
        const game = await Game.findById(gameId);
        if (!game) {
          return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

exports.editgame = async (req, res) => {
    try {
        const gameId = req.params.id;
        const {
          title,
          price,
          genre,
          stock,
          quantity,
          ram,
          cpuModel,
          gpuModel,
          ostype
        } = req.body;
    
        const updatedGame = await Game.findByIdAndUpdate(
          gameId,
          {
            title,
            price: Decimal128.fromString(price),
            genre,
            stock,
            quantity,
            ram,
            cpuModel,
            gpuModel,
            ostype
          },
          { new: true }
        );
    
        if (!updatedGame) {
          return res.status(404).json({ message: 'Game not found' });
        }
    
        res.status(200).json(updatedGame);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
 
};

exports.deleteGame = async (req, res) => {
    try {
        const gameId = req.params.id;
        const deletedGame = await Game.findByIdAndDelete(gameId);
        if (!deletedGame) {
          return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json({ message: 'Game deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

};