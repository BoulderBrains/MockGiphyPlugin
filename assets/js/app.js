// On click of the submit button, trigger the showMeGifs function
$("#search-submit").on("click", showMeGifs);

// Takes the search from the input, searches the giphy API and prepends
// the first 10 results inside the search modal
function showMeGifs() {
	event.preventDefault();
	var searchTerm = $("#search-input").val().trim();
	var giphyKey = "lG9ckorGrueBoeXQXp16qJ66xivTGyd1";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm +
		"&api_key=" + giphyKey + "&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			// pulling out the items I want to use from the API
			var animateURL = response.data[i].images.downsized.url;
			var stillURL = response.data[i].images.original_still.url;

			// forming an element for the returned data
			var wrapper = $("<div class='col-sm-6 text-center wrapper'>");
			var startStopButton = $("<input type='button' class='btn btn-secondary start-stop-button' value='start/stop'>");
			var copyButton = $("<input type='button' id='copy-button' class='btn btn-secondary copy-button' value='copy'>");
			var image = $("<img class='returned-image'>").attr("src", animateURL);
			image.attr("data-still", stillURL);
			image.attr("data-animate", animateURL);
			image.attr("data-state", "animate");

			// adding the created image and start and stop and copy buttons together to the wrapper
			wrapper.append(image, startStopButton, copyButton);
			// rendering the wrapper to the #results-container
			$("#results-container").prepend(wrapper);
		}
	});
};

// On click of the Start/Stop buttons, trigger the gifStartStop function which pauses playback of the gif
$(document).on("click", ".start-stop-button", gifStartStop);

// Starting and Stopping the gif by swapping out the src="" URLs
function gifStartStop() {
	var state = $(this).prev().attr("data-state");
	var dataStill = $(this).prev().attr("data-still");
	var dataAnimate = $(this).prev().attr("data-animate");

	if (state === "still") {
		$(this).prev().attr("src", dataAnimate);
		$(this).prev().attr("data-state", "animate");
	} else {
		$(this).prev().attr("src", dataStill);
		$(this).prev().attr("data-state", "still");
	}
}

// Listening to clicks on the copy buttons to trigger the copy to clipboard function
$(document).on("click", ".copy-button", copyToClipboard);


// TODO: This function is not yet working. If I had more time with this assignment, I would refactor this
// by including clipboard.js in my project "https://clipboardjs.com/". From what I read this would make 
// interacting with the user's clipboard much easier than attempting to to it nativly like I have attempted.
// Once the gif is copied to the user's clipboard, they would be able to paste the selected gif in the article
// or posting of their choice.  
function copyToClipboard() {
	var source = $(this).attr("src");
	console.log(source);
	source.src();
	document.execCommand("copy");
	console.log("Copy to clipboard");
}