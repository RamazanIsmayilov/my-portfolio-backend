const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./config/db.config')
const userRoutes = require("./routes/user.routes");
const experienceRoutes = require("./routes/experience.routes");
const educationRoutes = require("./routes/education.routes");
const projectRoutes = require("./routes/project.routes");
const skillRoutes = require("./routes/skill.routes");
const contactRoutes = require('./routes/contact.routes');
require('dotenv').config()

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/auth", userRoutes)
app.use("/experiences", experienceRoutes)
app.use("/educations", educationRoutes)
app.use("/projects", projectRoutes)
app.use("/skills", skillRoutes)
app.use('/contact', contactRoutes);

// Root route
app.get("/", (req, res) => {
    res.send('My Portfolio Api')
})

// Server setup
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})