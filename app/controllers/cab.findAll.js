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