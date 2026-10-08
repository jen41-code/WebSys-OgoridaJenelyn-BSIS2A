require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const usersRouter = require("./routes/users");
const { setServers } = require("dns");

const app = express();

// Make sure your connection string is correct
const mongoURI = 'mongodb+srv://jen-ogo:jenny@it112websys.w7qk147.mongodb.net/'; 

// Body parsers (required so req.body will not be undefined)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/users", usersRouter);

// Test route
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Mongo connect + start server
async function start() {
try {
    await mongoose.connect(process.env.MONGODB_URI);
    //await mongoose.createConnection+(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    } catch (err) {
    console.error("Startup error:", err.message);
    console.error('MongoDB connection error:', error);
    process.exit(1);

    }
}

start();