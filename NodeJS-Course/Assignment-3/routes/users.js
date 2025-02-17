const path = require('path');
const express = require('express');


const rootDir = require('../utils/path')

const router = express.Router();

router.get('/users', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'users.html'))
})

router.post('/users', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
})

module.exports = router;