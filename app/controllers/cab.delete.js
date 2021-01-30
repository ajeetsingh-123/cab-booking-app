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