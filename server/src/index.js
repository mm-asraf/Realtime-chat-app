const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

//config
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

const app = express();
app.use(express.json());

//connect DB
connectDB();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// serving images
app.use(express.static("public"));
app.use("/images", express.static("images"));

const PORT = process.env.PORT || 5698;
app.listen(PORT, console.log(`server is running at ${PORT}`));
