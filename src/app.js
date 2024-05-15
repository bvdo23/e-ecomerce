const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('../src/routes/userRouter'); // Sửa lại đường dẫn đến tệp route người dùng
const productRouter = require('../src/routes/productRouter'); // Sửa lại đường dẫn đến tệp route sản phẩm
const uploadRoute = require('../src/routes/uploadRouter');
const paymentRoute = require('../src/routes/paymentRouter');
const app = express();
const path = require('path')
const logger = require('morgan');
const cookieParser = require('cookie-parser');

app.use(cors(config.corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api', uploadRoute);
app.use('/api/payment', paymentRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(logger('dev'));
app.use(cookieParser());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;



