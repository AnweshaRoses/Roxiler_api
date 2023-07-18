const express = require("express");

const app=express()

const mongoose=require("mongoose")
const dotenv=require("dotenv")
const productRoute=require("./routes/products")

dotenv.config()

mongoose.connect(process.env.MONGO_URL ,{dbName: "Roxiler"}
    ).then(()=>console.log("DBconnection Successful")
    )
    .catch((err)=>{
        console.log(err);
    })
    const s3 = mongoose.connection.collection("s3");

app.use('/api',productRoute);


app.listen(5000,()=>{
    console.log("Backend server is running");
})