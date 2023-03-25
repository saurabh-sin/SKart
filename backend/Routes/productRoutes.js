const Product = require('../Models/Product');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../Middlewares/authMiddleware');
const Review = require('../Models/Review');

const router = require('express').Router();

//SEARCH

const filterWord = (searchText) => {
  let searchTexts = searchText.split(' ');
  return searchTexts.filter((text) => text.length > 3);
};

router.get('/search/:text', async (req, res) => {
  try {
    let searchText = req.params.text;
    // console.log(searchText);
    let titleProducts = await Product.find({
      title: { $regex: searchText, $options: 'i' },
    });

    // console.log(titleProducts);

    let filterWords = filterWord(searchText);

    let catProducts = await Product.find({ categories: { $in: filterWords } });

    let ids = catProducts.map((product) => product._id.toString());
    // console.log(ids);

    let finalProducts = [...catProducts];

    titleProducts.forEach((product) => {
      if (!ids.find((id) => id == product._id.toString())) {
        finalProducts.push(product);
      }
    });

    return res.status(200).send(finalProducts);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//CREATE

router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put('/:id', async (req, res) => {
  try {
    //console.log('I am here');
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', verifyToken, verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const reviews = await Review.findOne({ product: product._id }).populate(
      'reviews.user'
    );

    res.status(200).json({ product, reviews });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get('/', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/writereview/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    // console.log('review');

    const review = await Review.findOne({ product: id });

    if (review) {
      review.reviews.push({
        title: req.body.title,
        review: req.body.review,
        star: req.body.star,
        user: req.user.userId,
      });
      await review.save();
      return res.status(200).send(review);
    } else {
      const newReview = await Review.create({
        product: id,
      });
      newReview.reviews.push({
        title: req.body.title,
        review: req.body.review,
        star: req.body.star,
        user: req.user.userId,
      });

      await newReview.save();
      return res.status(200).send(newReview);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
