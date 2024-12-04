const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const authRoutes = require("./Routes/AuthorizationRoutes")

const app = express()
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("MongoDB Connected"))
   .catch(err => console.log("MongoDB Connection Error:", err));


app.use('/auth', authRoutes);


  
  
  










app.listen(3000,()=>{
    console.log("Server is Running at port 3000")
})