const mongoose = require("mongoose");

const { Schema } = mongoose;

const ListingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    imagerUrls: {
        type: Array,
        required: true,
    },
    useRef:{
      type:  mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Listing", ListingSchema);
