const express = require('express');
const path = require('path');
const app = express();
app.use(express.static("./public"));
const mainRouter = require('./routes/mainRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3004, () => 
console.log ('servidor corriendo en el puerto 3004'));

app.use(mainRouter);




