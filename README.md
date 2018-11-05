# MockGiphyPlugin
This is a mock project for a giphy plugin. 

This project is supposed to simulate a plugin button that would be placed within wordpress editor.

TO DO:
- Get the copyToClipboard() function working, probably by pulling in clipboard.js (https://clipboardjs.com/)
- Fold this funcionality into a wordpress plugin by following the wordpress docs closely: https://codex.wordpress.org/Writing_a_Plugin
- Add in some animations using animate.js, when copy button is clicked and gif is successfully copied to clipboard, shake the button or gif for verfication to the user copyToClipboard is succesful
- Allow editors to include more than one GIF with editable ordering. 
	- Could be done by: creating array, on click of copy button, addes gif to array, then display the array 
	elsewhere on the page for the user to choose from and add to their article.
- Rebuild this whole thing using a javascript framework, react.js or Vue.js