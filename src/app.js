
const express = require('express');
const userRoutes = require('../src/routes/userRoutes');

const app = express();

// Sử dụng tuyến đường API cho người dùng
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
