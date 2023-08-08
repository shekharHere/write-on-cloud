const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/writeOnCloud";

const connectToMongo = async () => {
    mongoose.connect(mongoURI, await
        console.log('Conneted to Mongo Successfully')
    )
}

// const connectToMongo = () => {
//     mongoose.connect(mongoURI, () => {
//         console.log('Conneted to Mongo Successfully')
//     })
// }

module.exports = connectToMongo
