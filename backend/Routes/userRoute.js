const express = require('express');
const router = express.Router();
const { registerUser, validateRegisterUser, loginUser,logoutUser } = require('../controllers/UserController'); 
const { fetchFoodItems } = require('../controllers/FoodItemsController');
const { addOrder, ordersData,validateOrder } = require('../controllers/OrderController');
const { ContactController } = require('../controllers/ContactController');
const verifyUser = require('../controllers/AuthMiddleware')
router.post('/register', validateRegisterUser, registerUser);
router.post('/login', loginUser);

router.get('/fooditems', verifyUser, fetchFoodItems);
router.post('/checkout', verifyUser,validateOrder, addOrder);
router.post('/contact', verifyUser, ContactController);
router.post('/logout', logoutUser);
router.get('/orders', verifyUser, ordersData);

module.exports = router;
