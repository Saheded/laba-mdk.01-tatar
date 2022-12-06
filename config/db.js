const mongoose = require('mongoose');
const config = require('config');
const database = config.get('mongoURI');

const connetToDB = async () =>
{
    try
    {
        await mongoose.connect(database, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('MongoDB is Connected');
    } catch (err)
    {
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connetToDB;