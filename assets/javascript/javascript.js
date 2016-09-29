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
		//random number variable
		var random = Math.floor(Math.random()*movie.length);
		//sends a random movie from the array to the html
		$('#results').append("Movie: " + movie[random].show_title + "<br>");
		//pushes to firebase
		database.ref().push(movie[random].show_title);

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

	var appKey = "3eb7ff7bd47dab68bd633c3a5ef47743";
	var appId = "79458510"

	var foodType = $('#food').val();
	console.log(foodType);


	var queryURL = "https://api.edamam.com/search?q=" + foodType +
					"&app_id=" + appId +
				    "&app_key=" + appKey;


	$.ajax({
		url: queryURL,
		method: 'GET',
		dataType: 'jsonp',
		jsonp: 'callback'
	}).done(function(food) {
		//AG add image, link to recipe
        //$('#results').append("<br>" + food.hits[0].recipe.label);
        var ran = Math.floor(Math.random()*food.hits.length);
        console.log("random number: " + ran);
        var imageURL = food.hits[ran].recipe.image;
        $('#resultsImage').html('<img src= ' + imageURL + '>');
        var recipeURL = food.hits[ran].recipe.url;
        $('#results').append("Recipe: " + "<br> <a href=\""  + recipeURL + "\">" +  food.hits[ran].recipe.label + "</a>");
	})
})

// AG Adding Edamam Call
//$('.submit').on('click', function(){
	
	
//})

