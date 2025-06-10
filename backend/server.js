const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getRoutes } = require('./routes/get');
const { postRoutes } = require('./routes/post');
const { putRoutes } = require('./routes/put');
const { deleteRoutes } = require('./routes/delete');
const { uploadRoutes } = require('./routes/upload');
const path = require('path');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  // Explicitly allow your frontend URL
    credentials: true,
}))
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use('/', getRoutes);
app.use('/', postRoutes);
app.use('/', putRoutes);
app.use('/', deleteRoutes);
app.use('/',uploadRoutes);

app.get('/', (req, res)=> {
    return res.json("From Backend Side");
})







app.listen(process.env.DB_PORT, ()=> {
    console.log("listening...");
})