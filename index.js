// load .env file
require('dotenv').config()
//import express
const express =require('express')
// import cors
const cors = require('cors')

const db=require('./DB/connection')

const router=require('./Routes/router')
// const ApplicationMiddlewares = require('./Middlewares/ApplicationMiddlewares')

// create serverApp
const serverApp =express()
// middleware
serverApp.use(cors())
serverApp.use(express.json())
// serverApp.use(ApplicationMiddlewares)
serverApp.use(router)
//Export image from backend to frotend
serverApp.use('/uploads',express.static("./uploads"))
//Port intialize
const PORT =3000 || process.env.PORT
//running
serverApp.listen(PORT,()=>{
    console.log("Server is Running " + PORT);
})
serverApp.get('/',(req,res)=>{
   
    res.send("Welcome to Server");
})