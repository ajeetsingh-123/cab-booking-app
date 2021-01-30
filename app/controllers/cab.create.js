
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