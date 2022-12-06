const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();
app.use(express.json({extended: false}))
app.get('/', (req,res) => res.send('API is running'));

app.use('/api/user/', require('./routes/user'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/post/', require('./routes/post'));
app.use('/api/post/all/', require('./routes/post'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));