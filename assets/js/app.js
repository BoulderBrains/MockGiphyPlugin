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
			var rating = response.data[i].rating;
			var animateURL = response.data[i].images.downsized.url;
			var stillURL = response.data[i].images.original_still.url;

			// forming an element for the return item
			var wrapper = $("<div class='col-lg-4 col-sm-6 wrapper'>");
			var ratingElement = $("<p>").text("Rating: " + rating);
			var image = $("<img class='returned-image'>").attr("src", stillURL);
			image.attr("data-still", stillURL);
			image.attr("data-animate", animateURL);
			image.attr("data-state", "still");

			// adding the ratingElement paragraph and the image img to the wrapper
			wrapper.append(image, ratingElement);
			// rendering the wrapper to the #results-container
			$("#results-container").prepend(wrapper);
		}
	});
};

// This is triggering the start/stop of a gif by swapping out the src="" URLs
function gifStartStop() {
	var state = $(this).attr("data-state");
	var dataStill = $(this).attr("data-still");
	var dataAnimate = $(this).attr("data-animate");

	if (state === "still") {
		$(this).attr("src", dataAnimate);
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", dataStill);
		$(this).attr("data-state", "still");
	}
}

// listeing to clicks on the returned images to trigger gifState and start/stop the gif
$(document).on("click", ".returned-image", gifStartStop);
