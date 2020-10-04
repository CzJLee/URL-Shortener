const express = require("express");
const morgan = require("morgan");
const mongodb = require("mongodb");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const dbURI = process.env.DB_URI;

// Connect to MongoDB Atlas
let collection;
const client = new mongodb.MongoClient(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
client
	.connect()
	.catch((error) => {
		throw error;
	})
	.then(async (connection) => {
		console.log("Successfully connected to MongoDB");
		collection = connection.db("urls").collection("urls");
	});

const app = express();

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());

app.get("/:id", (req, res) => {
	const id = req.params.id;
	collection.findOne({ _id: id }, (error, result) => {
		if (error) {
			throw error;
		} else {
			if (!result) {
				res.sendStatus(404);
			} else {
				collection.updateOne({ _id: id }, { $inc: { clicks: 1 } });
				res.redirect(result.url);
			}
		}
	});
});

app.post("/", (req, res) => {
	// Generate short ID
	const _id = genID();
	const url = req.body.url;

	doc = {
		_id: _id,
		url: url,
		clicks: 0,
		date_created: new Date(Date.now()).toISOString(),
	};

	collection.insertOne(doc);
	res.json(doc);
});

app.put("/", (req, res) => {
	const _id = req.body.newID;
	const url = req.body.url;

	collection.findOne({ _id: _id }, (error, result) => {
		if (error) {
			throw error;
		} else {
			if (result && result.url === url) {
				// If there already exists an entry with the given id and url
				// No change
				res.json({
					message: "No change",
					url: result.url
				})
			} else if (result) {
				// If there exists an entry with the given id but not the same url
				res.json({
					error: "URL is taken",
					url: result.url
				})
			} else {
				// If there is no entry found with that id
				doc = {
					_id: _id,
					url: url,
					clicks: 0,
					date_created: new Date(Date.now()).toISOString(),
				};

				collection.insertOne(doc);
				res.json(doc);
			}
		}
	})

	
})

function genID() {
	const validChars =
		"23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	newID = "";

	while (newID.length < 6) {
		newID += validChars[Math.floor(Math.random() * validChars.length)];
	}
	return newID;
}

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
