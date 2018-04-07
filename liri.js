// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
var request = require("request");
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("Twitter");
var client = new Twitter(keys.twitter);
var Spotify = require("node-spotify-api");

// Add the code required to import the keys.js file and store it in a variable.
// You should then be able to access your keys information like so:

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


if (process.argv[2] === "my-tweets") {
	client.get('statuses/user_timeline', {screen_name: "Mel Rich"}, function(error, tweets, response) {

		if (!error) {
			console.log(tweets[0].text);
		}

		if(error) { 
			console.log(error);
		}

	});
}

else if (process.argv[2] === "spotify-this-song") {
 
	var songName = process.argv[3];
	
	spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		var trackInfo = data.tracks.items[0]

		// Artist(s)
		for (var i = 0; i < trackInfo.artists.length; i++) {			
		console.log(trackInfo.artists[i].name);
	}
	// The song's name--DOESN'T WORK!
	console.log(trackInfo.name);

	// A preview link of the song from Spotify--DOESN'T WORK!
	console.log(trackInfo.preview_url);

		// The album that the song is from
	console.log(trackInfo.album.name);

	});
}


// Include the request npm package (Don't forget to run "npm install request" in this folder first!)

// Grab the movieName which will always be the third node argument.

else if (process.argv[2] === "movie-this") {

	var movieName = process.argv[3];
	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);
	request(queryUrl, function(error, response, body) {
		// If the request is successful
		if (!error && response.statusCode === 200) {
			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
			console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Metascore);
			console.log("The movie was produced in: " + JSON.parse(body).Country);
			console.log("The movie is in this language: " + JSON.parse(body).Language);
			console.log("The plot of the movie is: " + JSON.parse(body).Plot);
			console.log("The actors in the movie are: " + JSON.parse(body).Actors);
		}
		else {
			console.log("Try again.");
			// output data for the movie 'Mr. Nobody.'
		}
	});
}
