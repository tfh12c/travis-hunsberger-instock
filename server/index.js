const express = require('express');
const app = express();
const cors = require('cors');
const warehouseRoutes = require('./routes/warehouseRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

//Config
require('dotenv').config();
const port = process.env.PORT || 8080;

//Middleware
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body
app.use(cors()); //allows front end to make calls to API

//Routes
app.use('/warehouse', warehouseRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/category', categoryRoutes);

//Start server
app.listen(port, () => {
    console.log('App now listening on port ' + port);
})