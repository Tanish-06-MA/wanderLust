const express = require("express")
const mongoose = require("mongoose")
const listing = require("./models/listing.js")
const app = express();
const path  = require("path");
const methodOverride = require("method-override")
const ejsMate=require("ejs-mate")


app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"public")))

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
    res.render("home.ejs")
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


//Create new route
app.get("/listing/new", (req,res)=>{
    res.render("new.ejs")
})

//Post(Create) route
app.post("/listing", async(req,res)=>{
    let Listing = new listing(req.body.Listing);
    await Listing.save();
    
    res.redirect("/listing")
})

//Edit route
app.get("/listing/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id)
    res.render("edit.ejs", {list})
})

app.put("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/listing/${id}`)

})

//dELETE ROUTE
app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id)
    res.redirect(`/listing`)
    
})

//Show route
app.get("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id)
    res.render("show.ejs", {list})
})


app.listen(port, ()=>{
    console.log(`Server listening on ${port}`)
})