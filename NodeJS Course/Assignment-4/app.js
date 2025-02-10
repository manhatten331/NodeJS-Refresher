const path = require('path');

const express = require('express')
const bodyParser = require('body-parser')
const expressHandleBars = require('express-handlebars')

const app = express()

const usersRoute = require('./routes/users')
const homeRoute = require('./routes/home')

app.engine('handlebars', expressHandleBars.engine())
app.set('view engine', 'handlebars');
app.set('veiws', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res, next) => {
//     res.render('index', {pageTitle: 'Add New User', layout: "main-layout"})
// })

// app.get('/users', (req, res, next) => {
//     res.render('users', {pageTitle: 'Users', layout: "main-layout"})
// })

// app.post('/add-user', (req, res, next) => {
//     res.redirect('/users')
// })

app.use(usersRoute.routes);
app.use(homeRoute);

app.listen(3000)