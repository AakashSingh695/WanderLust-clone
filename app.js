const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const data = require("./init/data.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")))



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

//index route
app.get("/listing", async (req,res)=>{
  const allListings =  await Listing.find({});
   res.render("./listings/index.ejs",{allListings})
    
}
);
//new route
app.get("/listing/new",(req,res)=>{
  res.render("listings/new.ejs");
  
});

// show route
app.get("/listing/:id",async (req,res)=>{
  let {id }=req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
  console.log(listing);

});

//create route
app.post("/listings",async(req,res)=>{
  //let {title,description,image,price,country,location} =req.body;

 const newlisting=  new Listing(req.body.listing);
 await newlisting.save();
  console.log(" create route :(save new listing)");
  res.redirect("/listing");
  


})

//Edit route
app.get("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
})

app.put("/listings/:id",async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
 res.redirect(`/listing/${id}`);
})

//delete route
app.delete("/listing/:id", async(req,res)=>{
  let {id} = req.params;
 const deleteListing = await Listing.findByIdAndDelete(id);
 console.log(deleteListing);
 res.redirect("/listing");

})



// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "my new villa",
//     description: "by the beach",
//     price: 1200,
//     location: "goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("Sample was saved!");
//   res.send("Successful testing");
// });

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
