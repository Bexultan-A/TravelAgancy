const {Schema, model} = require('mongoose')

const MyTour = new Schema({
    destination: String,
    departDate: String,
    returnDate: String,
    city: String,
    price: String,
    image: String,
    dateAdded: String,
    owner: String
})

module.exports = model('MyTour', MyTour)