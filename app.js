const express = require("express");
const mongoose = require("mongoose");
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

app.get("/test", (req, res) => {
	res.send("test")
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`));