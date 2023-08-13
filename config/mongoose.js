const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

main()
    .then(() => {
        console.log("mongoose is working");
    })
    .catch((err) => console.log(err));

async function main() {
    // CONNECTING MONGOOSE TO  OUR MONGODB DATABASE
    await mongoose.connect(process.env.databaseURI);
}