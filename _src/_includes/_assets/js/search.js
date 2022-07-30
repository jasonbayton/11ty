// Execute a function when the user releases a key on the keyboard
var input = document.getElementById('searchinput')
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    window.location = '/search&keyword=' + input.value;

  }
}); 
