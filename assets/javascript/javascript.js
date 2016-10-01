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

  $('#movieresults').hide();
  $('#foodresults').hide();
  $('#refreshResultsButton').hide();
  $('#resetButton').hide();


$('.reset').on('click', function(){
	$('#movies').show();
	$('#food1').show();
	$('#submit').show();
	$('#movieresults').hide();
	$('#foodresults').hide();
	$('#refreshResultsButton').hide();
	$('#resetButton').hide();	
})


$('.submit').on('click', function(){

	//$('#movieresults').empty();
	//$('#foodresults').empty();
	$('#movieresults').html("");
	$('#foodresults').html("");

	$('#movies').hide();
	$('#food1').hide();
	$('#submit').hide();
	$('#movieresults').show();
	$('#foodresults').show();
	$('#refreshResultsButton').show();
	$('#resetButton').show();
	
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
		$('#movieresults').append(movie[random].show_title + "<br>");
		//pushes to firebase
		database.ref().push(movie[random].show_title);

		// AG update for Movie Poster
		// Here we grab the text from the input box 
		var moviePoster = movie[random].show_title;
		// Here we assemble our URL 
		var queryURL = "http://www.omdbapi.com/?t=" + moviePoster + "&y=&plot=short&r=json";

		$.ajax({url: 
			queryURL, method: 'GET'})
			.done(function (movieData) {
				movieUrl = "'" + movieData.Poster + "'";
				console.log(movieData);
				console.log(movieData.Poster);				
				$('#movieresults').append('<img src= ' + movieUrl + '>')
				$('#movieresults').append(movieData.plot);
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
        $('#foodresults').append('<img src= ' + imageURL + '>');
        var recipeURL = food.hits[ran].recipe.url;
        $('#foodresults').append("<br> <a target='_blank' href=\""  + recipeURL + "\">" +  food.hits[ran].recipe.label + "</a>");
        //$('#foodresults').append($('#submit'));
	})
})
