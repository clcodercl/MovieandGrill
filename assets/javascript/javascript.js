//Firebase
//Ajax call to Netflix Roulette API
//Ajax call to Food2Fork API
//JQuery to add movie suggestion to HTML
//JQuery to add recipes to HTML

console.log('testing 1 2');


$('.submit').on('click', function(){
	
	//default call from API website. parameters will be changed based on user input

	console.log('tester');

	var genre = $('#genre').val();
	var actor = $('#actor').val();
	var director = $('#director').val();

	console.log("genre: " + genre + ", actor: " + actor + ", director: " + director);

	var newActor = actor.split(" ").join("%20");
	var newDirector = director.split(" ").join("%20");

	var queryURL = "http://netflixroulette.net/api/api.php?actor=" + newActor + "&director=" + newDirector;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done( function(movie) {
		console.log(movie[0].show_title);
		$('#results').append(movie[0].show_title);
	})
})

// AG update for Movie Poster
	$('#submit').on('click', function(){

		// Here we grab the text from the input box 
		var moviePoster = movie;

		// Here we assemble our URL 
		var queryURL = "http://www.omdbapi.com/?t=" + moviePoster + "&y=&plot=short&r=json";

		//------
		$.ajax({url: 
			queryURL, method: 'GET'})
			.done(function (movieData) {
				movieUrl = "'" + movieData.Poster + "'";

				console.log(movieData);
				console.log(movieData.Poster);
				
				$('#results').html('<img src= ' + movieUrl + '>');
		})
})


//var APIkey = "ed4f6d7da758d9572e9076762c6831d9";

//$('.submit').on('click', function(){
//	var queryURL = "https://community-food2fork.p.mashape.com/search?key=" + APIkey + "&q=Italian";
	//default call from API website. parameters will be changed based on user input

//	console.log('tester');

//	$.ajax({
//		url: queryURL,
//		method: 'GET'
//	}).done( function(movie) {
//		console.log(movie);
//	})
//})


