/* eslint-disable no-undef */
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

const commandLength = process.argv.length
if (commandLength < 3) {
    console.log('Please give the password')
}


mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {

        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function (v) {
                const pattern = /^\d{2,3}-\d{7,}$/
                return pattern.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)

