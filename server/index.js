const express = require('express');
const app = express();
const cors = require('cors');
const warehouseRoutes = require('./routes/warehouseRoutes');

//Config
require('dotenv').config();
const port = process.env.PORT || 8080;

//Middleware
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body
app.use(cors());

//Routes
app.use('/warehouse', warehouseRoutes);

//Start server
app.listen(port, () => {
    console.log('App now listening on port ' + port);
})