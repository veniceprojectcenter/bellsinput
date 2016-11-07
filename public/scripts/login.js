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

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
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
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE silent]
            /* document.getElementById('quickstart-sign-in-status').textContent = 'Signed in'; */
            document.getElementById('sign-in-status').textContent = displayName; 
            /* document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  '); */
            if (!emailVerified) {
                /* document.getElementById('quickstart-verify-email').disabled = false; */
            }
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE silent]
            $('.ui.modal').modal('show');
            /* document.getElementById('quickstart-sign-in-status').textContent = 'Signed out'; */
            document.getElementById('sign-in-status').textContent = 'Sign In'; 
            /* document.getElementById('quickstart-account-details').textContent = 'null'; */
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        /* document.getElementById('quickstart-sign-in').disabled = false; */
        // [END_EXCLUDE]
    });

    // [END authstatelistener]
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
    initApp();
};