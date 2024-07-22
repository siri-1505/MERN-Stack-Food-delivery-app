// src/model/FoodItem.js
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    id: Number,
    title: String,
    restaurantChain: String,
    image: String,
    imageType: String,
    description:String
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
