const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Require Cab routes
require('./app/routes/cab.route.js')(app);

// Configuring the database
//const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const port = process.env.port || 3000
mongoose.connect('mongodb://localhost:27017/rent',{ useCreateIndex: true,useNewUrlParser: true , useUnifiedTopology: true,useFindAndModify: false  });

mongoose.connection.on('connected',(err)=>{
    if(err)
    {
        console.log('error while connecting to database '+ error);
    }
    else{
        console.log('connected to database mongodb @ 27017');
    }
    })

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Cab rental application!"});
});

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});