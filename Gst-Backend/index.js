const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;
const morgan = require('morgan');
require("dotenv").config();
const api = require("./Routes/api");
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error",(err)=>{
    console.log("Error while connection Server !!");

});
db.once("open",() =>{
    console.log("Database Connected Successfully")
})


const corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || "*", // this work well to configure origin url in the server
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"], // to works well with web app, OPTIONS is required
    allowedHeaders: ["Content-Type", "Authorization"], // allow json and token in the headers
  };
  app.use(cors(corsOpt)); // cors for all the routes of the application
  app.options("*", cors(corsOpt));
  
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  

  app.listen(PORT || 5000, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use("/",api)