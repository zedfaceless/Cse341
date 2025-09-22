const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    venue: {type: String, required: true},
    organizer: {type: String, required: true},
    capacity: {type: Number, required: true},
});

module.export =s = mongoose.model('Event', eventSchema);