async function shortenURL() {
	const longURL = document.getElementById("long-url").value;

	// Input validation

	// On Validation Success
	// Generate backend link
	bodyData = {
		url: longURL
	}
	
	let shortID;

	await fetch('/', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST', 
		body: JSON.stringify(bodyData)
	})
	.then(response => response.json())
	.then(data => {
		shortID = data._id
	})
	.catch(error => {
		console.error('Error:', error);
	});

	const shortURL = "short.czjlee.com/" + shortID

	// Reveal copy and edit buttons
	document.getElementById("copy-button").hidden = false;
	document.getElementById("edit-button").hidden = false;
	
	// Create new URL alert
	document.getElementById("short-url").value = shortID;
	document.getElementById("url-alert").hidden = false;
	document.getElementById("short-link").innerHTML = shortURL;
	document.getElementById("short-link").href = shortURL; 
}

function copyToClipboard() {
	const textToCopy =
		"short.czjlee.com/" + document.getElementById("short-url").value;
	navigator.clipboard.writeText(textToCopy).then(
		function () {
			const copyButton = document.getElementById("copy-button");
			copyButton.innerHTML = "Copied!";
		},
		function (error) {
			alert("Copy Failed");
		}
	);
}

function editButton() {
	document.getElementById("short-url-group").hidden = false;
	document.getElementById("url-alert").hidden = true;
	document.getElementById("copy-button").hidden = true;
	document.getElementById("edit-button").hidden = true;
	document.getElementById("save-button").hidden = false;
}

function saveButton() {
	const shortURL = "short.czjlee.com/" + document.getElementById("short-url").value;
	document.getElementById("short-link").innerHTML = shortURL;
	document.getElementById("url-alert").hidden = false;
	document.getElementById("copy-button").hidden = false;
	document.getElementById("edit-button").hidden = false;
	document.getElementById("short-url-group").hidden = true;
	document.getElementById("save-button").hidden = true;
	document.getElementById("copy-button").innerHTML = "Copy Link";
}