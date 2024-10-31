const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./config/db')
const userRoutes = require("./routes/user.routes");
require('dotenv').config()

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use("/auth", userRoutes)

// Root route
app.get("/", (req, res) => {
    res.send('My Portfolio Api')
})

// Server setup
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})