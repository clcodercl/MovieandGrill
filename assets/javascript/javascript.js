//Firebase
//Ajax call to Netflix Roulette API
//Ajax call to Food2Fork API
//JQuery to add movie suggestion to HTML
//JQuery to add recipes to HTML

console.log('testing 1 2');

$('.submit').on('click', function(){
	var queryURL = "http://netflixroulette.net/api/api.php?title=Attack%20on%20titan";
	//default call from API website. parameters will be changed based on user input

	console.log('tester');

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done( function(movie) {
		console.log(movie);
	})
})

var APIkey = "ed4f6d7da758d9572e9076762c6831d9";

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


