const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRouter');
const errorHandler = require('./middleware/errorHandlerMiddleware');
const UserRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/product', productRouter);
app.use('/api/auth', UserRouter);
app.use(errorHandler);
module.exports = app;
