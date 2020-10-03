const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'))

app.get("/test", (req, res) => {
	res.send("test")
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`));