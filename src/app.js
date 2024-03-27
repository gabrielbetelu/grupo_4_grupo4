const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3004;
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const userApiRouter = require('./routes/userApiRouter');
const productApiRouter = require('./routes/productApiRouter');
const methodOverride = require('method-override');
const log = require('./middlewares/log');
const session = require('express-session');
const cookie = require('cookie-parser');
const cookieExiste = require('./middlewares/cookieLogMiddleware')
const logMiddleware = require('./middlewares/logMiddleware');


app.use(express.static("./public"));
app.use(cookie());
app.use(session({
    secret: "secreto grupo 4", 
    resave: false,
    saveUninitialized: false,
}));

app.use(cookieExiste);
app.use(logMiddleware);

app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.use(methodOverride('_method'));
app.use(log);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => 
console.log(`servidor corriendo en el puerto ${port}`));


app.use(mainRouter);

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/api/user', userApiRouter);
app.use('/api/product', productApiRouter);






