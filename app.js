const express = require("express");
const morgan = require("morgan")
const mongodb = require("mongodb");
const { json } = require("body-parser");
const { mongo } = require("mongoose");
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const dbURI = process.env.DB_URI;

// Connect to MongoDB Atlas
const client = new mongodb.MongoClient(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
client.connect()
	.catch(error => {throw(error)})
	.then(async connection => {
		console.log("Successfully connected to MongoDB")
		const collection = connection.db("urls").collection("urls")

		const obj = {url: "testurl.com"};
		const result = await collection.insertOne(obj);

		console.log(
			`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
		);
	});


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