module.exports = (app) => {
    const cabs = require('../controllers/cab.controller.js');

    // Create a new Cab
    app.post('/cabs/addCab', cabs.create);

    // Retrieve all Cabs
    app.get('/cabs/getCabs', cabs.findAll);

    // Retrieve a single Cab with cabId
    app.get('/cabs/getCab/:cabId', cabs.findById);

    // Retrieve available cabs given parameters
    app.get('/cabs/availableCabs/:datetime/:capacity', cabs.findAvailableCabs);

    // Book a Cab given cabId
    app.post('/cabs/bookCab', cabs.bookCab);

    // Update a cab with cabId
    app.put('/cabs/updateCab/:cabId', cabs.update);

    // Delete a Cab with cabId
    app.delete('/cabs/deleteCab/:cabId', cabs.delete);
}