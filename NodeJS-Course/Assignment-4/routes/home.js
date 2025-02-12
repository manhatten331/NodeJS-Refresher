const path = require('path')
const express = require('express')

const rootDir = require('../util/path')
const userPageData = require('./users')

const router = express.Router();

router.get('/users', (req, res, next) => {
    const userData = userPageData.products;
    res.render('users', {
        data: userData,
        pageTitle: 'Users',
        homeCSS: true,
        activeUsersPage: true,
        layout: "main-layout", 
    })
});

module.exports = router