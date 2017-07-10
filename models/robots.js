const mongoose = require('mongoose');

const robotsSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    username: String,
    name: String,
    avatar: String,
    email: String,
    university: String,
    job: String,
    company: String,
    skills: [String],
    phone: String,
    address: [{
                street_num: Number,
                street_name: String,
                city: String,
                state_or_province: String,
                postal_code: Number,
                country: String
            }]
});

const robots = mongoose.model('robots', robotsSchema);

module.exports = robots;
