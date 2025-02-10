const path = require('path')
const express = require('express')

const router = express.Router();

const product = [];

router.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Add New User',
        usersCSS: true,
        activeAddUsersPage: true,
        layout: "main-layout", 
    })
})

router.post('/add-user', (req, res, next) => {
    product.push({ userName: req.body.userName })
    res.redirect('/users')
})

exports.routes = router;
exports.products = product;