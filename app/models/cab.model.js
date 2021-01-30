const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    isAvailable: {
       type:Boolean,
       required: true 
    },
    issue_date: {
        type : Date,
        default: "1000-01-01T00:00:00.000Z"
    },
    return_date: {
        type : Date,
        default: "1000-01-01T00:00:00.000Z"
    }
});

const CabSchema = mongoose.Schema({
    vehicle_no: { 
        type:String,
        required: true,
        unique:true
    },
    model: { 
        type:String,
        required: true
    },
    year: { 
        type:Number,
        required: true
    },
    seating_capacity: { 
        type:Number,
        required: true
    },
    rent_per_day: { 
        type:Number,
        required: true
    },
    booking_details: {
        type:[BookingSchema],
        default:{isAvailable:true}
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cab', CabSchema);