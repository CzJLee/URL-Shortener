function shortenURL() {
	const longURL = document.getElementById("long-url").value;

	// Input validation
	if (!validURL(longURL)) {
		// Invalid URL
		// Show warning
		document.getElementById("alert-warning").hidden = false;

		// Hide/Reset other fields in case of new url
		document.getElementById("copy-button").hidden = true;
		document.getElementById("edit-button").hidden = true;
		document.getElementById("url-alert").hidden = true;
	} else {
		// On Validation Success

		// Generate backend link using POST request
		// Create body object
		bodyData = {
			url: longURL
		}
		// Send fetch Post Request to backend app
		fetch('/', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST', 
			body: JSON.stringify(bodyData)
		})
		.then(response => response.json())
		.then(data => {
			// Get new short url string
			const shortURL = data._id

			// Append first part of new short link
			const shortLink = "short.czjlee.com/" + shortURL

			// Reveal copy and edit buttons
			document.getElementById("copy-button").hidden = false;
			document.getElementById("copy-button").innerHTML = "Copy Link";
			document.getElementById("edit-button").hidden = false;

			// Hide warning if showing
			document.getElementById("alert-warning").hidden = true;
			
			// Create new URL alert
			document.getElementById("short-url").value = shortURL;
			document.getElementById("url-alert").hidden = false;
			document.getElementById("short-link").innerHTML = shortLink;
			document.getElementById("short-link").href = shortURL; 
		})
		.catch(error => {
			document.getElementById("alert-danger").hidden = false;
		});
	}
}

// This works on localhost, but does not seem to work in production. Most likely it needs the Clipboard API permissions. 
// function copyToClipboard() {
// 	const textToCopy =
// 		"short.czjlee.com/" + document.getElementById("short-url").value;
// 	navigator.clipboard.writeText(textToCopy).then(
// 		function () {
// 			document.getElementById("copy-button").innerHTML = "Copied!";
// 		},
// 		function (error) {
// 			alert("Copy Failed");
// 		}
// 	);
// }

function copyToClipboard() {
	// https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
	const textToCopy = "short.czjlee.com/" + document.getElementById("short-url").value;
	// Create a new text area to copy from, and then remove it afterwords. 
	const el = document.createElement('textarea');
	el.value = textToCopy;
	// Try the best to hide it from view so it does not interrupt the UI.
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	// Copy the text
	document.execCommand('copy');
	// Remove element
	document.body.removeChild(el);
	// UI feedback
	document.getElementById("copy-button").innerHTML = "Copied!";
};

function editButton() {
	document.getElementById("short-url-group").hidden = false;
	document.getElementById("url-alert").hidden = true;
	document.getElementById("copy-button").hidden = true;
	document.getElementById("edit-button").hidden = true;
	document.getElementById("save-button").hidden = false;
}

function saveButton() {
	shortURL = document.getElementById("short-url").value;
	if (!validShortURL(shortURL)) {
		// Not a valid short URL
		// Must contain alphanumeric, -, and _ characters.
		// Show warning
		document.getElementById("short-url-alert-warning").hidden = false;
	} else {
		const shortURL = document.getElementById("short-url").value;
		const longURL = document.getElementById("long-url").value;

		const bodyData = {
			newID: shortURL,
			url: longURL
		}

		fetch('/', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'PUT', 
			body: JSON.stringify(bodyData)
		})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				// The short URL is already taken
				document.getElementById("short-url-alert-taken").hidden = false;
			} else {
				const shortLink = "short.czjlee.com/" + shortURL;
				document.getElementById("short-link").innerHTML = shortLink;
				document.getElementById("short-link").href = shortURL; 
				document.getElementById("short-url-alert-warning").hidden = true;
				document.getElementById("short-url-alert-taken").hidden = true;
				document.getElementById("url-alert").hidden = false;
				document.getElementById("copy-button").hidden = false;
				document.getElementById("edit-button").hidden = false;
				document.getElementById("short-url-group").hidden = true;
				document.getElementById("save-button").hidden = true;
				document.getElementById("copy-button").innerHTML = "Copy Link";
			}
		})
		.catch(error => {
			document.getElementById("alert-danger").hidden = false;
		});
	}
}

function validURL(url) {
	const pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return pattern.test(url);
}

function validShortURL(url) {
	const pattern = new RegExp('^(\\w)+$')
	return pattern.test(url);
}