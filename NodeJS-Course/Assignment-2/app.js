const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log("Manzell is with God and God is with Manzell");
//     next();
// });

// app.use((req, res, next) => {
//     console.log("Manzell is with God and God is with Manzell");
//     res.send("<h1>Do not get discourged you will get what you seek in Jesus name AMEN!</h1>")
// });

app.use('/users' , (req, res, next) => {
    res.send("<h1>Do not get discourged you will get what you seek in Jesus name AMEN!</h1>")
});


app.use('/' , (req, res, next) => {
    res.send("<h1>Even when things look bleak and there seems to be no light at the end of the tunnel God is here with you!</h1>")
});

app.listen(3000)