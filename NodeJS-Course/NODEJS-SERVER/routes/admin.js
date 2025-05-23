const path = require('path')
const express = require('express');

const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/add-product', adminController.getAddProductPage);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProductPage)

router.post('/delete-product', adminController.postDeleteProduct)

router.post('/edit-product', adminController.postEditProduct)

module.exports = router;