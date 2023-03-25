const Cart = require('../Models/Cart');
const {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} = require('../Middlewares/authMiddleware');

const router = require('express').Router();

//CREATE

router.post('/', verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.body.user });
    if (cart) {
      cart.products.push({
        productId: req.body.product._id,
        quantity: 1,
      });

      await cart.save();
      res.status(200).json(cart);
    } else {
      const newCart = new Cart({
        userId: req.body.user,
      });

      newCart.products.push({ productId: req.body.product._id, quantity: 1 });
      await newCart.save();
      res.status(200).json(newCart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put(
  '/:id',
  verifyToken,
  verifyTokenAndAuthorisation,
  async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//DELETE
router.delete(
  '/:id',
  verifyToken,
  verifyTokenAndAuthorisation,
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json('Cart has been deleted...');
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//GET USER CART
router.get('/find/:userId', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      'products.productId'
    );
    console.log(cart);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get('/', verifyToken, verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
