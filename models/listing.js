const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listeningSchems = new schema({
    title: {
        type: String,
        required: true,
    },
    description: String,

    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default:
                "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-FNAURWZ6Mqc",
            set: (v) =>
                v === ""
                    ? "https://unsplash.com/photos/3d-render-of-luxury-hotel-lobby-and-reception-FNAURWZ6Mqc"
                    : v,
        },
    },

    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listeningSchems);

module.exports = Listing;
