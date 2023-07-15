const mongoose = require('mongoose')


const commandLength = process.argv.length
if (commandLength < 3) {
    console.log('Please give the password')
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url = `mongodb+srv://fullstack:${password}@cluster0.ozbig34.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const entrySchema = new mongoose.Schema({
    name: String,
    number: String
})

const Entry = mongoose.model('Entry', entrySchema)


if (commandLength > 3) {
    const entry = new Entry({
        name: name,
        number: number
    })

    entry.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}

else {
    Entry.find({}).then(result => {
        console.log('phonebook:')
        result.forEach((entry) => {
            console.log(`${entry.name} ${entry.number}`)
        })
        mongoose.connection.close()
    })
}
