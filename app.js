const express = require("express")
const mongoose = require("mongoose")
const listing = require("./models/listing.js")
const app = express();
const path  = require("path")

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB")
}).catch(err=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req,res)=>{
    res.send("Im am root")
})

// app.get("/testlisting",async(req,res)=>{
//     let sampleListing = new listing({
//         title:"My new villa",
//         description:"Join us",
//         price: 900000,
//         location: "Chenani",
//         country: "India"
//     })

//    await  sampleListing.save()
//    console.log("saved")
//    res.send("success testing")
// })

//Index route
app.get("/listing", async(req, res)=>{
    let allListings = await listing.find({})
    console.log(allListings)
    res.render("index.ejs", {allListings})
   
})

//Show route
app.get("/listing/:id",(req,res)=>{
    res.send("show")
})

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`)
})