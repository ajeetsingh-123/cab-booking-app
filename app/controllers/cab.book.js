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