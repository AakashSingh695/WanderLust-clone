const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");

const upload = multer({storage});





router.route("/")
.get(wrapAsync(listingController.index ))
.post(isLoggedIn,validateListing ,upload.single("listing[image][url]"),wrapAsync(listingController.createListing));


router.get("/new",isLoggedIn, listingController.rednerNewForm);



router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image][url]") , validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner , wrapAsync(listingController.destroyListing));



// // Index root
// router.get("/",wrapAsync(listingController.index ))

// // New route
// router.get("/new",isLoggedIn,validateListing, listingController.rednerNewForm);

// // Show Route
// router.get("/:id",wrapAsync(listingController.showListing));

// create route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing))

//Edit route
router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.rednerEditForm))

// // Update route
// router.put("/:id",isLoggedIn,isOwner , validateListing,wrapAsync(listingController.updateListing))

// // Delete route
// router.delete("/:id",isLoggedIn,isOwner , wrapAsync(listingController.destroyListing));


module.exports = router;