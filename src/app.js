const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const methodOverride = require('method-override');
const log = require('./middlewares/log');
const session = require('express-session');
const cookie = require('cookie-parser');

app.use(express.static("./public"));
app.use(cookie());
app.use(session({
    secret: "secreto grupo 4", 
    resave: false,
    saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.use(methodOverride('_method'));
app.use(log);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3004, () => 
console.log ('servidor corriendo en el puerto 3004'));


app.use(mainRouter);

app.use('/user', userRouter);
app.use('/product', productRouter);






