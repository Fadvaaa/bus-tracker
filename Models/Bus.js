const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    busName: { type: String, required: true },
    busNumber: { type: String, required: true },
    busFrom: { type: String, required: true },
    busTo: { type: String, required: true },
    busStartTime: { type: Date, required: true },
    busStopTime: { type: Date, required: true },
    busRoutes: [{
        place: { type: String, required: true },
        busTime: { type: Date, required: true },
        status: {
            type: String,
            enum: ['idle', 'running'],
            default: 'idle',
            validate: {
                validator: function (value) {
                    return ['idle', 'running'].includes(value);
                },
                message: 'Invalid status passed',
            },
        },
    }],
    isDeleted: { type: Boolean, required: true, default: false },
}, {
    versionKey: false
});

module.exports = mongoose.model('buses', Schema);
