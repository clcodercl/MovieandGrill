//Firebase
//Ajax call to Netflix Roulette API
//Ajax call to Food2Fork API
//JQuery to add movie suggestion to HTML
//JQuery to add recipes to HTML


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyADsArEnJbn4MJjAu8US-Q0DkGpGLCz_DI",
    authDomain: "movie-e845e.firebaseapp.com",
    databaseURL: "https://movie-e845e.firebaseio.com",
    storageBucket: "movie-e845e.appspot.com",
    messagingSenderId: "156828451616"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$('.submit').on('click', function(){
	
	var actor = $('#actor').val();
	var director = $('#director').val();

	console.log("actor: " + actor + ", director: " + director);

	var newActor = actor.split(" ").join("%20");
	var newDirector = director.split(" ").join("%20");

	var queryURL = "http://netflixroulette.net/api/api.php?actor=" + newActor + "&director=" + newDirector;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done( function(movie) {
		console.log(movie[0].show_title);
		$('#results').append(movie[0].show_title + "<br>");
		database.ref().push(movie[0].show_title);

		// AG update for Movie Poster
		// Here we grab the text from the input box 
		var moviePoster = movie[0].show_title;
		// Here we assemble our URL 
		var queryURL = "http://www.omdbapi.com/?t=" + moviePoster + "&y=&plot=short&r=json";

		$.ajax({url: 
			queryURL, method: 'GET'})
			.done(function (movieData) {
				movieUrl = "'" + movieData.Poster + "'";
				console.log(movieData);
				console.log(movieData.Poster);				
				$('#resultsImage').html('<img src= ' + movieUrl + '>');
		})
	})
})

// AG Adding Edamam Call
$('.submit').on('click', function(){
	
	var appKey = "3eb7ff7bd47dab68bd633c3a5ef47743";
	var appId = "79458510"

	var queryURL = "https://api.edamam.com/search?q=chicken" +
					"&app_id=" + appId +
				    "&app_key=" + appKey;

	$.ajax({
		url: queryURL,
		method: 'GET',
		dataType: 'jsonp',
		jsonp: 'callback'
	}).done(function(food) {
		console.log(food);
		console.log(food.hits[0].recipe.label);
		$('#results').append("<br>" + food.hits[0].recipe.label);
	})
})

