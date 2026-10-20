const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realestatedb";

app.use(cors());
app.use(express.json());

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 1 },
    type: { type: String, required: true, enum: ["Apartment", "House", "Villa"] }
});
const Property = mongoose.model("Property", propertySchema);

app.get("/", (req, res) => res.send("Real Estate API is running. Use /api/properties"));

app.get("/api/properties", async (req, res) => {
    try { res.json(await Property.find()); }
    catch (err) { res.status(500).json({ message: "Could not get properties." }); }
});

app.post("/api/properties", async (req, res) => {
    try {
        const property = await Property.create({
            title: req.body.title, location: req.body.location,
            price: req.body.price, type: req.body.type
        });
        res.status(201).json(property);
    } catch (err) { res.status(400).json({ message: err.message || "Could not add property." }); }
});

app.delete("/api/properties/:id", async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found." });
        res.json({ message: "Property deleted." });
    } catch (err) { res.status(400).json({ message: "Invalid property ID." }); }
});

async function startServer() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB:", MONGO_URI);
        app.listen(PORT, () => console.log("Backend running at http://127.0.0.1:" + PORT));
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        console.error("Check MongoDB Community Server and backend/.env.");
        process.exit(1);
    }
}
startServer();
