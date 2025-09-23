const express = require("express");
const app = express();
app.use(express.json());
const connectDB = require("./config/db");

const cors = require("cors");

// Enable CORS for all origins (default)
app.use(cors());

connectDB();

const allRoutes = require("./routes");

app.use("/", allRoutes);

app.listen(3001, () => console.log("Auth Service on port 3001"));
