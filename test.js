function validShortURL(url) {
	const pattern = new RegExp('^(\\w)+$')
	return pattern.test(url);
}

console.log(validShortURL("eafh3a8f983_ahodfafe"))