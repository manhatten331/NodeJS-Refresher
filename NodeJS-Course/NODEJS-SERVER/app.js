// const http = require('http');

// const routes = require("./routes")

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

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

// app.use((req, res, next) => {
//     console.log("In the middleware");
//     next();
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, '/views', 'page-not-found.html'))
// });

app.use(errorController.get404Page)

app.listen(3000);

// const server = http.createServer(app);

// server.listen(3000);