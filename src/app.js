const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('../src/routes/userRouter'); // Sửa lại đường dẫn đến tệp route người dùng
const productRouter = require('../src/routes/productRouter'); // Sửa lại đường dẫn đến tệp route sản phẩm
const uploadRoute = require('../src/routes/uploadRouter');
const app = express();


app.use(cors(config.corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api', uploadRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
