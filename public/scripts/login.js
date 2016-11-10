// Get the button that opens the modal
var buttonToShowLogin = document.getElementById("buttonToShowLogin"),
    loginButton = document.getElementById("loginButton");

var config = {
    apiKey: "AIzaSyC6NAfPU1NV6QJcqL4sg4VJGa9S7nVXP4Q",
    authDomain: "cityknowledge.firebaseapp.com",
    databaseURL: "https://cityknowledge.firebaseio.com",
    storageBucket: "firebase-cityknowledge.appspot.com",
    messagingSenderId: "445655714967"
};
var fb = firebase.initializeApp(config);

window.onload = function() {
    // initApp();
};

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
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    document.getElementById("loginButton").onclick = function() {
        toggleSignIn();
    }

    // When the user clicks on the button, open the modal 
    document.getElementById("buttonToShowLogin").onclick = function() {
        $('.ui.modal').modal('show');
    }
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        /* document.getElementById('quickstart-verify-email').disabled = true; */
        // [END_EXCLUDE]
        if (user) {
            // User is signed in.
            var email = user.email;
            var displayName = email.split("@")[0];
            var emailVerified = user.emailVerified;
            // [START_EXCLUDE silent]
            document.getElementById('sign-in-status').textContent = displayName; 
            if (!emailVerified) {
                /* document.getElementById('quickstart-verify-email').disabled = false; */
            }
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE silent]
            $('.ui.modal').modal('show');
            document.getElementById('sign-in-status').textContent = 'Sign In';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        /* document.getElementById('quickstart-sign-in').disabled = false; */
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
}