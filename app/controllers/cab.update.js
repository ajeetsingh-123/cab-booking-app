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