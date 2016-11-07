// Get the button that opens the modal
var showLoginButton = document.getElementById("showLoginButton"),
	loginButton = document.getElementById("loginButton");

var fb = firebase.initializeApp({
    apiKey: "AIzaSyAYZ9Nb200nKhcGyHF11ABGshzcAMy5-k8",
    authDomain: "sample-firebase-b2d4d.firebaseapp.com",
    databaseURL: "https://sample-firebase-b2d4d.firebaseio.com",
    storageBucket: "sample-firebase-b2d4d.appspot.com",
    messagingSenderId: "875898499054"
 });

$('.ui.modal').modal('show');

loginButton.onclick = function() {
    toggleSignIn();
}

// When the user clicks on the button, open the modal 
showLoginButton.onclick = function() {
	$('.ui.modal').modal('show');
}

/* HELPER FUNCTIONS * HELPER FUNCTIONS * HELPER FUNCTIONS * HELPER FUNCTIONS * */

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
        // [END authwithemail]     
    }

    if (firebase.auth().currentUser) {
        $('.ui.modal').modal('hide');
        alert("welcome back!");
    }   
}