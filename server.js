const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./config/db')
const userRoutes = require("./routes/user.routes");
const experienceRoutes = require("./routes/experience.routes");
const educationRoutes = require("./routes/education.routes");
require('dotenv').config()

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use("/auth", userRoutes)
app.use("/experiences", experienceRoutes)
app.use("/educations", educationRoutes)

// Root route
app.get("/", (req, res) => {
    res.send('My Portfolio Api')
})

// Server setup
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})