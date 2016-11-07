// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var loginButton = document.getElementById("loginButton");

$('.ui.modal').modal('show');

loginButton.onclick = function() {
	username = $('#username').val();
	password = $('#password').val();
	console.log(username);
	console.log(password);
}

// When the user clicks on the button, open the modal 
btn1[0].onclick = function() {
   $('.ui.modal').modal('show');
}