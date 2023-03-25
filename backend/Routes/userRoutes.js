const bcrypt = require('bcryptjs');
const express = require('express');

const {
  verifyToken,
  verifyTokenAndAdmin,
} = require('../Middlewares/authMiddleware');
const {
  verifyTokenAndAuthorisation,
} = require('../Middlewares/authMiddleware');
const User = require('../Models/User');

const router = express.Router();

router.patch('/:id', verifyToken, async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }

  try {
    console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).send({
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.delete(
  '/:id',
  verifyToken,
  verifyTokenAndAuthorisation,
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).send('User deleted!');
    } catch (error) {
      return res.status(500).send('Error occured while deleting!');
    }
  }
);

router.get('/stats', verifyToken, verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log('Yo');
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },

      {
        $group: {
          _id: '$month',
          total: {
            $sum: 1,
          },
        },
      },
    ]);

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get(
  '/:id',
  verifyToken,
  verifyTokenAndAuthorisation,
  async (req, res) => {
    try {
      console.log('Here');
      const user = await User.findById(req.params.id);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send('Error in finding user!');
    }
  }
);

router.get('/', verifyToken, async (req, res) => {
  try {
    // console.log('Here');
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send('Error in finding user!');
  }
});

module.exports = router;
