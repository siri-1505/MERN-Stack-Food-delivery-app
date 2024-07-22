const FoodItem = require('../model/FoodItem');

const fetchFoodItems = async (req, res) => {
    try {
        const food_items = await FoodItem.find();
        return res.status(200).json(food_items);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { fetchFoodItems };
