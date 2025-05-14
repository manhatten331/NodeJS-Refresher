// const http = require('http');

// const routes = require("./routes")

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const sequelize = require('./util/database')

// db.execute('SELECT * FROM PRODUCTS')
// .then( result => {
//     console.log(result[0])
// })
// .catch(err => {
//     console.log(err)
// });

const app = express();

const hbs = expressHbs.create({
    defaultLayout: 'main-layout',
    helpers: {
        eq: (a, b) => a === b
    }
})


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page)

sequelize
    .sync()
    .then(result => {
        // console.log(result);
        app.listen
    })
    .catch(err => {
        console.log(err);
    })

app.listen(3000);
