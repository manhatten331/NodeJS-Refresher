const path = require('path');
const express = require("express")

const shopController = require('../controllers/shop')

const router = express.Router();

// router.get('/', (req, res, next) => {
//     console.log(adminData.products);
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// });

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct)

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart)

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

module.exports = router;