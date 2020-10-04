const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose");
const { json } = require("body-parser");
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@url-shortener.jnq1j.mongodb.net/urls?retryWrites=true&w=majority`;

// Connect to MongoDB Atlas
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	// (node:18781) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
	.then(console.log("MongoDB Connected."))
	.catch((error) => console.log(error));

const app = express();

app.use(express.static('public'))
app.use(morgan("dev"))
app.use(express.json())

app.get("/test", (req, res) => {
	res.send("test")
})

app.post("/", (req, res) => {
	// Generate short ID
	console.log(req.body)
	const _id = "sHoRt0"
	const url = req.body.url
	res.json({_id, url})
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`));