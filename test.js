const { json } = require("body-parser");
const fetch = require("node-fetch");


const data = { username: 'example' };

bodyData = {
	url: "https://czjlee.com"
}

console.log(JSON.stringify(bodyData))

fetch('http://localhost:3000/', {headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
  },method: 'POST', body: JSON.stringify(bodyData)})
.then(response => response.json())
.then(data => {
	console.log(data.url);
})
.catch((error) => {
	console.error('Error:', error);
});

