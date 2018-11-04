// on click of the submit button, create a new button with search value
$("#search-submit").on("click", showMeGifs);

// Takes the data-name off the button, searches the giphy API and prepends
// 10 results to the page
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

			// forming an element for the return item
			var wrapper = $("<div class='col-sm-6 wrapper'>");
			var startStopButton = $("<input type='button' class='btn btn-secondary startStopButton' value='start/stop'>");
			var image = $("<img class='returned-image'>").attr("src", animateURL);
			image.attr("data-still", stillURL);
			image.attr("data-animate", animateURL);
			image.attr("data-state", "animate");

			// adding the created image and start and stop buttons together to the wrapper
			wrapper.append(image, startStopButton);
			// rendering the wrapper to the #results-container
			$("#results-container").prepend(wrapper);
		}
	});
};

// Listening to clicks on the Start/Stop buttons to trigger start & stop the gif playback
$(document).on("click", ".startStopButton", gifStartStop);

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



function copyImage(url) {
	var img = document.createElement('img');
	img.src = url;
	document.body.appendChild(img);
	var r = document.createRange();
	r.setStartBefore(img);
	r.setEndAfter(img);
	r.selectNode(img);
	var sel = window.getSelection();
	sel.addRange(r);
	document.execCommand('Copy');
}


function copyGifToClipboard() {
	// Copy gif to clipboard on click
	var url = $(this).src;
	console.log(url);
	var copyGifButton = $(".returned-image");
	console.log(copyGifButton);

	// copyTextToClipboard('Gif Clicked');
	copyImage(this.url);
	console.log("Copy to clipboard function triggered");
}
