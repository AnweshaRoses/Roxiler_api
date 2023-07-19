const express = require("express");

const app=express()

const mongoose=require("mongoose")
const dotenv=require("dotenv")
const productRoute=require("./routes/products")
const statisticsRoute=require("./routes/statictics")

dotenv.config()

mongoose.connect(process.env.MONGO_URL ,{dbName: "Roxiler"}
    ).then(()=>console.log("DBconnection Successful")
    )
    .catch((err)=>{
        console.log(err);
    })
    const s3 = mongoose.connection.collection("s3");

app.use('/api',productRoute);
app.use('/api/statistics',statisticsRoute);


app.listen(5000,()=>{
    console.log("Backend server is running");
})