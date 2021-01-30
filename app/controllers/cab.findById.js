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
