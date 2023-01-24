const express = require('express');
const app = express();
const cors = require('cors');

//Config
require('dotenv').config();
const port = process.env.PORT || 8080;

//Middleware
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body
app.use(cors());

//Routes

//Start server
app.listen(port, () => {
    console.log('App now listening on port ' + port);
})