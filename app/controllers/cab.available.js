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