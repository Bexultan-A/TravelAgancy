const {Schema, model} = require('mongoose')

const Tour = new Schema({
    destination: String,
    departDate: String,
    returnDate: String,
    city: String,
    price: String,
    image: String
})

module.exports = model('Tour', Tour)