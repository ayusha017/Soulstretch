const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

// CORS Middleware
app.use(cors());

app.use(express.json());

app.use("/images", express.static("public/images"));
// ✅ Fix the route path
app.use("/api/yoga", require("./routes/yogaRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

