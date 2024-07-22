const { body, validationResult } = require('express-validator');
const Order = require('../model/Orders'); 

const validateOrder = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('address1').notEmpty().withMessage('Address line 1 is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('zip').matches(/^\d{6}$/).withMessage('Zip code must be 6 digits'),
  body('country').notEmpty().withMessage('Country is required'),
  body('cardName').notEmpty().withMessage('Card name is required'),
  body('cardNumber').matches(/^\d{12}$/).withMessage('Card number must be 12 digits'),
  body('cardExp').matches(/^(0[1-9]|1[0-2])\/\d{4}$/).withMessage('Card expiry must be in MM/YYYY format'),
  body('cardCVV').matches(/^\d{3}$/).withMessage('CVV must be 3 digits'),
  body('billingAddress').notEmpty().withMessage('Billing address is required'),
  body('totalPrice').isFloat({ gt: 0 }).withMessage('Total price must be greater than 0'),
];

const addOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name, email, phone, address1, address2, city, state, zip, country,
    cardName, cardNumber, cardExp, cardCVV, billingAddress, orderItems, totalPrice
  } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id, // Use the user ID from the verified token
      name, email, phone, address1, address2, city, state, zip, country,
      cardName, cardNumber, cardExp, cardCVV, billingAddress, orderItems, totalPrice
    });

    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder); 
  } catch (error) {
    return res.status(400).json({ message: error.message }); 
  }
};

const ordersData = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }); 
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

module.exports = { validateOrder, addOrder, ordersData };
