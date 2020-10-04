function shortenURL() {
	const longURL = document.getElementById("long-url").value;

	// Input validation

	// On Success
	// document.getElementById("short-url-group").hidden = false;
	document.getElementById("copy-button").hidden = false;
	document.getElementById("edit-button").hidden = false;
	
	const shortURL = "short.czjlee.com/" + "short"
	document.getElementById("short-url").value = "short";
	document.getElementById("test-alert").hidden = false;
	document.getElementById("short-link").innerHTML = shortURL;
	document.getElementById("short-link").href = shortURL; 
}

// function editURL() {
// 	const shortURL = "short.czjlee.com/" + document.getElementById("short-url").value;
// 	document.getElementById("short-link").innerHTML = shortURL;
// }

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
	document.getElementById("test-alert").hidden = true;
	document.getElementById("copy-button").hidden = true;
	document.getElementById("edit-button").hidden = true;
	document.getElementById("save-button").hidden = false;
}

function saveButton() {
	const shortURL = "short.czjlee.com/" + document.getElementById("short-url").value;
	document.getElementById("short-link").innerHTML = shortURL;
	document.getElementById("test-alert").hidden = false;
	document.getElementById("copy-button").hidden = false;
	document.getElementById("edit-button").hidden = false;
	document.getElementById("short-url-group").hidden = true;
	document.getElementById("save-button").hidden = true;
	document.getElementById("copy-button").innerHTML = "Copy Link";
}