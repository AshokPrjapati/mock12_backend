const { default: mongoose } = require("mongoose");

const calculateSchema = mongoose.Schema({
    p: Number,
    i: Number,
    n: Number,
});

const calculateModel = mongoose.model('calulation', calculateSchema);

module.exports = calculateModel;