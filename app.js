const express = require("express");
const morgan = require("morgan")
const mongodb = require("mongodb");
const { json } = require("body-parser");
const { mongo } = require("mongoose");
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const dbURI = process.env.DB_URI;

// Connect to MongoDB Atlas
let collection;
const client = new mongodb.MongoClient(dbURI, {useUnifiedTopology: true})
client.connect((error, connection) => {
	if (error) {
		throw(error)
	}
	else {
		console.log("Successfully connected to MongoDB")
		collection = connection.db("urls").collection("urls")
	}
})

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