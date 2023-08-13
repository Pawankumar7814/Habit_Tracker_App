const mongoose = require("mongoose");
const DatabaseURI = require('./config.json');

main()
    .then(() => {
        console.log("mongoose is working");
    })
    .catch((err) => console.log(err));

async function main() {
    // CONNECTING MONGOOSE TO  OUR MONGODB DATABASE
    await mongoose.connect(DatabaseURI.databaseURI);
}