# URL Shortener

This is a simple single page web app that I built in one day. This app is a URL Shortener that allows the user to enter a long url, and then creates a short link that will redirect to the long url. This app uses Express routing to redirect short links to the long URL. It uses HTML and JS for the front end, and Express and MongoDB for the back end routing and database. 

A live version can be seen here: [short.czjlee.com](https://short.czjlee.com)

- [URL Shortener](#url-shortener)
	- [How to use](#how-to-use)
	- [Application Structure](#application-structure)
		- [Short Link vs. Short URL](#short-link-vs-short-url)
		- [HTML](#html)
		- [CSS](#css)
		- [Javascript](#javascript)
		- [Express](#express)
		- [MongoDB](#mongodb)
	- [Database Structure](#database-structure)
	- [Future Changes](#future-changes)
		- [User Privileges](#user-privileges)
		- [UI Updates](#ui-updates)
		- [POST vs. PUT](#post-vs-put)
		- [Better MongoDB Access](#better-mongodb-access)

## How to use
The user enters a valid URL, and a short URL is generated. URL validation requires a `http://` or `https://` prefix. A short URL is then generated and presented to the user. Buttons to copy the link or edit the link are presented. 

The user can edit the short url by changing the URL extension to any alphanumeric string as long as it is not already taken. 

## Application Structure
The front end handles the UI and input validation, and then sends POST requests to the express backend framework. 

### Short Link vs. Short URL
In this README and in the code, I use the terms short url, short link, and long url. The `long url` is the full extended URL that the user inputs, that the short link will redirect to. The `short link` is the full short link, such as [short.czjlee.com/gh](https://short.czjlee.com/gh). The `short url` is the text after the /. In the short link [short.czjlee.com/gh](https://short.czjlee.com/gh), the short url refers to "gh". 

### HTML
The HTML elements are built using Bootstrap. 

### CSS 
The CSS theme for Bootstrap used is [Flatly](https://bootswatch.com/flatly/) by Bootswatch Font Awesome is used for the Link icon. 

### Javascript
Javascript functions are used to handle button clicks and validation. URL Validation is done using RegExp. The rest of the functions handle the UI changes on button clicks, and sending POST requests to the backend. A copy function is also implemented to automatically copy the short link to the users clipboard when the button is clicked. 

### Express
Express routing is used to redirect short URLS. It retrieves the long url from the database, and redirects the user. A not found page is given if the short link does not exist. 

### MongoDB
MongoDB is used as a database to store URLs. POST requests are made when a user creates or edits a short url, and GET requests are made when a user uses a short link. 

## Database Structure
Each URL object is stored in a `urls` collection. The structure for each object is below. 
```
{
	_id: String,
	url: String,
	clicks: Integer,
	date_created: Date
}
```

The object `_id` is also used as the short url, since it must be unique. The `url` is the long url link that the short link redirects to. `Clicks` is the number of times the short link has been used. The date that the short url was created is saved in a ISO format in `date_created`. 

## Future Changes
There are a handful of improvements I would make to this app if development were to continue. 

### User Privileges 
It would be nice to allow users to edit or delete short urls that they have made in the past. To do so, I would ask the user to log in to an account, and associate every short link they created with that account. That account would then be able to edit or delete previously created short links. A list of previous short links would be presented below the main card. 

### UI Updates
Most of the Javascript is handling changing the visibility of the buttons and input fields. This can be tidied up using a more advanced frame work, but I wanted to stick to vanilla JS for this app. 

### POST vs. PUT
At this time, editing a created URL sends a post request to create a new object in the database. Thus, both the randomly generated short link and the user created short link both redirect to the same long url link. While this does not really matter at this scale, it would be nice to make the distinction if user accounts are implemented. 

### Better MongoDB Access
A lot of building this app was learning how to use MongoDB in Node.js. The intention was to create a sustained connection in the backed app, as to not waste time creating a new connection promise each time a URL was created or a short link was used. However, the current implementation is a bit clumsy, and has many if/else statements stacked to deal with the asynchronous nature of MongoDB in Node.js. 