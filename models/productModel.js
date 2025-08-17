import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.ObjectId, ref: 'Category', required: true },
    fragranceNotes: {
        top: { type: [String], default: [] },
        middle: { type: [String], default: [] },
        base: { type: [String], default: [] }
    },
    scentFamily: { type: String },
    gender: { type: String },
    longevity: { type: String },
    occasion: { type: String },
    quantity: { type: Number, required: true },
    tags: { type: [String], default: [] },
    photo: { data: Buffer, contentType: String },
    shipping: { type: Boolean }
}, { timestamps: true });


export default mongoose.model("Products", productSchema);
