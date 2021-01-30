const Cab = require('../models/cab.model.js');
// const Booking = require('../models/cab.model.js');

// Create and Save a new Cab
exports.create = (req, res) => {

    /*Cab.remove({}, function(err) { 
        console.log('collection removed') 
     });
    Booking.remove({}, function(err) { 
        console.log('collection removed') 
     });
     return res.send('collections removed');*/
    
     
    // Validate request
    if(!req.body.vehicle_no) {
        return res.status(400).send({
            status: 400,
            message: "Vehicle number cannot be empty"
        });
    }

    // Create a new Cab
    const cab = new Cab({
        vehicle_no: req.body.vehicle_no,
        model: req.body.model || "NA",
        year: req.body.year || -1,
        seating_capacity: req.body.seating_capacity,
        rent_per_day: req.body.rent_per_day
    });

    // Save Cab into the database
    cab.save()
    .then(data => {
        res.send({
            status:200,
            data:data,
            message:'Cab created successfully'});
    }).catch(err => {
        res.status(500).send({
            status:500,
            message: err.message || "Some error occurred while creating the Cab."
        });
    });
};

// Retrieve and return -> all cabs from the database.
exports.findAll = (req, res) => {
    Cab.find()
    .then(cabs => {
        res.send({
            status:200,
            data:cabs,
            message: "Retrieved the cabs successfully"
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err.message || "Some error occurred while retrieving cabs."
        });
    });
};

// Find a single cab -> Body must have a cabId
exports.findById = (req, res) => {
    Cab.findById(req.params.cabId)
    .then(cab => {
        if(!cab) {
            return res.status(404).send({
                status: 404,
                message: "Cab not found with id " + req.params.cabId
            });            
        }
        res.send({
            status:200,
            data:cab,
            message: "Cab retrieved successfully"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status:404,
                message: "Cab not found with id " + req.params.cabId
            });                
        }
        return res.status(500).send({
            status:500,
            message: "Error retrieving cab with id " + req.params.cabId
        });
    });
};

// Find available cabs using parameters -> Body must have date/time, seating capacity
exports.findAvailableCabs = (req, res) => {

    _datetime = req.params.datetime;
    _capacity = req.params.capacity;

    Cab.find({ "seating_capacity":_capacity, "booking_details.return_date":{ '$lte': _datetime }})
    .then(cabs => {
        if(!cabs || cabs.length == 0) {
            return res.status(404).send({
                message: "0 Cabs found with given parameters. "
            });            
        }
        res.send({
            status:200,
            data:cabs,
            message: "Retrieved the cabs successfully"
        });
    }).catch(err => {
        return res.status(500).send({
            status:500,
            message: "Error retrieving cab with given parameters"
        });
    });
};

// Book a cab -> REQUEST BODY must have vehicle number and days for rental
exports.bookCab = (req, res) => {
    
    const _cabId = req.body.cabId;
    const _issue_date = req.body.issue_date;
    const _return_date = req.body.return_date;
    Cab.findById(_cabId)
    .then(cab => {
            console.log(cab.booking_details[0].isAvailable);
            if(cab.booking_details[0].isAvailable == false) {
                var _message1 =  "Vehicle is not available for booking.";
            if(cab.booking_details[0].return_date) 
                var _message2 =  " Will be available after " + cab.booking_details[0].return_date;
            else _message2 = "";
            return res.status(400).send({
                status:400,
                message: _message1+_message2
            });
        }
        // BOOK THE CAB
        cab.booking_details[0] = {
            isAvailable: false,
            issue_date: _issue_date,
            return_date: _return_date
        }
        console.log('booking the cab');
        cab.save()
        .then(data => {
            res.send({
                status:200,
                data:data,
                message:'Cab booked successfully'});
        }).catch(err => {
            res.status(500).send({
                status:500,
                message: err.message || "Some error occurred while booking the Cab."
            });
        })
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving cab with cab id " + _cabId
        });
    });
};

// Update a cab identified by the cabId in the request
exports.update = (req, res) => {

    // find by id and update
   Cab.findById(req.params.cabId)
    .then(cab => {
        if(!cab) {
            return res.status(404).send({
                status:404,
                message: "Cab not found with id " + req.params.cabId
            });            
        }
        //CHECK IF AVAILABLE HERE, ELSE REJECT
        if ( cab.booking_details[0].isAvailable == false ) {
            res.send({
                status:400, 
                message:'The cab you\'re trying to update is already booked. Try again after ' + cab.booking_details[0].return_date 
            });
        }

        const filter = { "_id": req.params.cabId };
        const update = req.body;
        //console.log(req.body)
        Cab.findOneAndUpdate(filter,update)
        .then(data => {
            if(!data ) {
                return res.status(404).send({
                    status:404,
                    message: "No Cab found. "
                });            
            }
           res.send(data);
        }).catch(err => {
            return res.status(500).send({
                status:500,
                message: "Error retrieving cab with given parameters"
            });
        });
        
    }).catch(err => {               
        return res.status(500).send({
            status:500,
            message: "Error retrieving cab with id " + req.params.cabId
        });
    });

};

// Delete a cab with the specified cabId in the request
exports.delete = (req, res) => {
    Cab.findById(req.params.cabId)
    .then(cab => {
        if(!cab) {
            return res.status(404).send({
                status: 404,
                message: "Cab not found with id " + req.params.cabId
            });            
        }
        //CHECK IF AVAILABLE HERE, ELSE REJECT
        if ( cab.booking_details[0].isAvailable == false ) {
            res.send({
                status:400, 
                message:'The cab you\'re trying to update is already booked. Try again after ' + cab.booking_details[0].return_date
            });
        }
        Cab.deleteOne({"_id":req.params.cabId})
        .then(cabs => {
            res.send({
                status:200,
                data:cabs,
                message: "Retrieved the cabs successfully"
            });
        }).catch(err => {
            res.status(500).send({
                status:500,
                message: err.message || "Some error occurred while deleting cab."
        });
    });
}).catch(err => {               
        return res.status(500).send({
            status:500,
            message: "Error deleting cab with id " + req.params.cabId
        });
    });

};