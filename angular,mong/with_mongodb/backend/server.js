const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    type: { type: String, required: true }
});

const Property = mongoose.model("Property", propertySchema);

app.get("/", function(req, res) {
    res.send("Real Estate API is running.");
});

app.get("/api/properties", async function(req, res) {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve properties" });
    }
});

app.post("/api/properties", async function(req, res) {
    try {
        const property = await Property.create({
            title: req.body.title,
            location: req.body.location,
            price: req.body.price,
            type: req.body.type
        });
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ error: "Could not add property. Check all fields." });
    }
});

app.delete("/api/properties/:id", async function(req, res) {
    try {
        const deleted = await Property.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Property not found" });
        res.json({ message: "Property deleted" });
    } catch (error) {
        res.status(400).json({ error: "Invalid property ID or delete failed" });
    }
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realestatedb";

mongoose.connect(MONGO_URI)
    .then(function() {
        console.log("Connected to MongoDB");
        app.listen(PORT, function() {
            console.log("Backend running at http://127.0.0.1:" + PORT);
        });
    })
    .catch(function(error) {
        console.error("MongoDB connection failed:", error.message);
        console.error("Start MongoDB Community Server and try again.");
    });
